#!/usr/bin/env bash
# Run on the LTRC server as dan (or a maintainer with deployment permissions).
set -Eeuo pipefail

usage() {
  echo "Usage: $0 [--dry-run]"
  echo 'Pull main, build the LTRC site, and publish it. --dry-run previews publishing only.'
}
dry_run=()
case "${1:-}" in
  '') ;;
  --dry-run) dry_run=(--dry-run --itemize-changes) ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac
[[ $# -le 1 ]] || { usage >&2; exit 2; }

source_dir=/srv/ltrc/website
web_root=/var/www/ltrc
for command in git npm rsync flock; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done
cd "$source_dir"
[[ -d "$web_root" && -w "$web_root" ]] || { echo "Website directory is missing or not writable: $web_root" >&2; exit 1; }
exec 9>"$(git rev-parse --git-path ltrc-deploy.lock)"
flock -n 9 || { echo 'Another website deployment is running.' >&2; exit 1; }
[[ "$(git branch --show-current)" == main ]] || { echo 'Source checkout must be on main.' >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo 'Source checkout has local changes; refusing to pull.' >&2; exit 1; }

# Shared source files should remain editable by the maintainer group.
umask 0002
git pull --ff-only origin main
# Refuse to publish local commits that have not been merged into origin/main.
[[ "$(git rev-parse HEAD)" == "$(git rev-parse refs/remotes/origin/main)" ]] || {
  echo 'Local main differs from origin/main; refusing to publish.' >&2; exit 1;
}
npm ci --no-audit --no-fund
npm run build
[[ -s dist/index.html && -d dist/_astro ]] || { echo 'Build output is missing; refusing to publish.' >&2; exit 1; }

# These are separately maintained sites, not part of the Astro build.
# Exclusions protect their existing files from both copying and deletion.
rsync -rlt --checksum --delete-delay --omit-dir-times \
  --chmod=D755,F644 \
  --exclude='/plo' \
  --exclude='/sambhashana' \
  --exclude='/vi_plo_test' \
  "${dry_run[@]}" dist/ "$web_root/"

if [[ ${#dry_run[@]} -gt 0 ]]; then
  echo 'Dry run complete. Source was updated and built; published files were not changed.'
else
  echo "Published $(git rev-parse --short HEAD) to $web_root."
fi
