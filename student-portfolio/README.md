# Student Portfolio

React + Vite portfolio for Shaswat Patel.

## Automatic GitHub-to-resume sync

The resume project list is generated from the GitHub REST API for `24ce094-lang`. It includes every **public, non-fork repository**, including archived repositories, and excludes forks so upstream projects aren't presented as your own. Private repository metadata is intentionally not published to the public resume.

The generated data is stored in `src/data/github-repositories.json`, which powers the online resume. The sync script also regenerates `public/shaswat_patel_resume.pdf`; all repository entries are included in the PDF's first page.

### Automation

GitHub Actions runs the sync:
- Automatically every six hours.
- Manually from the repository's **Actions → Sync GitHub projects to resume → Run workflow** page.
- When the sync script or workflow configuration changes.

The schedule is the mechanism for discovering repositories created in other repositories; GitHub does not automatically send events from every unrelated repository into this workflow. A new public repository will appear after the next successful sync (or after you manually run it). The workflow commits the generated JSON and PDF only when they change. If your portfolio host is connected to this repository for Git-based deployments, those commits will trigger its normal deployment.

### Run the sync locally

Requires Python 3.10+ and network access to the public GitHub API.

```sh
python3 -m pip install -r requirements-resume.txt
npm run sync:resume
npm run build
npm run lint
```

The script fails without replacing the generated files if GitHub cannot be reached or returns an unexpected/empty response.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
npm run lint
```
