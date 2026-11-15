# Getting `portfolio-v2` onto GitHub

Status as of this audit: **the work is committed locally but NOT yet pushed.**
There is no GitHub write credential in this workspace, so the push was refused
by GitHub (`remote: No anonymous write access.`).

Nothing is lost. Two independent recovery routes follow.

---

## Route A — authenticate here, then push (fastest)

The remote is already configured and fetching correctly. Only authentication is
missing. Pick one:

### Option 1: GitHub CLI (device login, no secret pasted into chat)

```bash
gh auth login --hostname github.com --git-protocol https --web
```

It prints a one-time code and waits. Open the URL it shows, enter the code,
approve. Then:

```bash
cd /home/ubuntu/project
git push -u origin portfolio-v2
```

### Option 2: fine-grained personal access token

Create a token at <https://github.com/settings/tokens> with **Contents: Read and
write** scoped to `elasoruayodeji/ayodex-portfolio`. Then, without pasting it
into a chat message:

```bash
cd /home/ubuntu/project
git config credential.helper store   # stores it in ~/.git-credentials
git push -u origin portfolio-v2      # enter the token as the password
```

Revoke the token afterwards if you prefer, but note the remote will then need
re-authenticating for future pushes.

### Option 3: SSH key

```bash
ssh-keygen -t ed25519 -C "elasoruayodeji@gmail.com" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub    # add this at https://github.com/settings/keys
git remote set-url origin git@github.com:elasoruayodeji/ayodex-portfolio.git
git push -u origin portfolio-v2
```

---

## Route B — take the work with you and push from your own machine

`recovery/portfolio-v2-full.bundle` is a complete, verified Git bundle of the
branch (all 7 commits, full history, 63 tracked files). Download it, then:

```bash
git clone https://github.com/elasoruayodeji/ayodex-portfolio.git
cd ayodex-portfolio
git fetch /path/to/portfolio-v2-full.bundle portfolio-v2:portfolio-v2
git checkout portfolio-v2
git push -u origin portfolio-v2
```

Check the bundle's tip and integrity before trusting it (do not rely on a
commit SHA copied from a document — it changes whenever a commit is added):

```bash
git bundle verify /path/to/portfolio-v2-full.bundle
git bundle list-heads /path/to/portfolio-v2-full.bundle
```

The tip must match `git rev-parse portfolio-v2` in this workspace.

This route needs no credential in this workspace at all, because the push
happens from your authenticated machine.

---

## What was verified in this workspace

- `portfolio-v2` is a direct descendant of GitHub's `main` (`d7040c2`):
  7 commits ahead, 0 behind — a clean fast-forward, so no force-push is needed.
- GitHub's `main` is untouched and still at `d7040c2`.
- Working tree is clean; all portfolio work is in commits.
- No `.env`, credential, `node_modules`, `.next` or `out/` file is tracked.
- A secret scan over tracked files found no keys or tokens.
- The bundle was test-restored into a clean clone to confirm it contains the
  real rebuild (63 files, serif fonts, circular portrait).

## Do not

- Do not force-push (`--force`). It is unnecessary: the branch fast-forwards.
- Do not push `main` from this workspace. Local `main` is a synthetic snapshot
  commit (`babe312`) whose tree differs from GitHub's by two `.freecode` files;
  it carries no value and would create confusion.
- Do not merge into `main` until the branch has been reviewed on GitHub.
