#!/usr/bin/env python3
"""Fetch all public, non-fork repositories and regenerate resume data and PDF."""
from __future__ import annotations

import json
import os
import ssl
import sys

import certifi
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from textwrap import shorten

ROOT = Path(__file__).resolve().parents[1]
USERNAME = os.environ.get("GITHUB_USERNAME", "24ce094-lang")
DATA_FILE = ROOT / "src" / "data" / "github-repositories.json"
PDF_FILE = ROOT / "public" / "shaswat_patel_resume.pdf"
API_BASE = "https://api.github.com"


def fetch_repositories() -> list[dict]:
    repositories = []
    page = 1
    while True:
        query = urllib.parse.urlencode({
            "type": "owner",
            "sort": "created",
            "direction": "desc",
            "per_page": 100,
            "page": page,
        })
        request = urllib.request.Request(
            f"{API_BASE}/users/{urllib.parse.quote(USERNAME)}/repos?{query}",
            headers={
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "github-resume-sync",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=30, context=ssl.create_default_context(cafile=certifi.where())) as response:
                payload = json.load(response)
        except (urllib.error.URLError, urllib.error.HTTPError) as error:
            raise RuntimeError(f"GitHub API request failed on page {page}: {error}") from error
        if not isinstance(payload, list):
            raise RuntimeError("Unexpected GitHub API response; expected a repository list.")
        repositories.extend(payload)
        if len(payload) < 100:
            break
        page += 1

    normalized = []
    for repo in repositories:
        if repo.get("fork") or repo.get("private"):
            continue
        normalized.append({
            "id": repo["id"],
            "name": repo["name"],
            "full_name": repo["full_name"],
            "description": (repo.get("description") or "Project repository.").strip(),
            "url": repo["html_url"],
            "homepage": repo.get("homepage") or "",
            "language": repo.get("language") or "Various technologies",
            "stars": repo.get("stargazers_count", 0),
            "created_at": repo.get("created_at", ""),
            "updated_at": repo.get("updated_at", ""),
            "topics": repo.get("topics", []),
        })
    normalized.sort(key=lambda item: (item["created_at"], item["name"].lower()), reverse=True)
    return normalized


def generate_pdf(repositories: list[dict]) -> None:
    try:
        from reportlab.lib import colors
        from reportlab.lib.enums import TA_CENTER, TA_LEFT
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
        from reportlab.lib.units import mm
        from reportlab.platypus import (
            BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
            KeepTogether, PageBreak,
        )
    except ImportError as error:
        raise RuntimeError("PDF generation requires reportlab. Install it with: python3 -m pip install reportlab") from error

    page_width, page_height = A4
    left = right = 16 * mm
    top = 14 * mm
    bottom = 13 * mm
    doc = BaseDocTemplate(
        str(PDF_FILE), pagesize=A4,
        leftMargin=left, rightMargin=right, topMargin=top, bottomMargin=bottom,
        title="Shaswat Patel — Resume",
        author="Shaswat Patel",
        subject="Computer Engineering and software development projects",
    )
    frame = Frame(left, bottom, page_width - left - right, page_height - top - bottom, id="main")
    doc.addPageTemplates([PageTemplate(id="resume", frames=frame)])

    navy = colors.HexColor("#17243b")
    blue = colors.HexColor("#315fba")
    muted = colors.HexColor("#53627a")
    pale = colors.HexColor("#edf2fa")
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="Name", parent=styles["Title"], fontName="Helvetica-Bold",
        fontSize=20, leading=23, textColor=navy, alignment=TA_CENTER, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Role", parent=styles["Normal"], fontSize=9, leading=12,
        textColor=muted, alignment=TA_CENTER, spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
        fontSize=11, leading=13, textColor=blue, spaceBefore=5, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="BodySmall", parent=styles["BodyText"], fontSize=8, leading=10,
        textColor=navy, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="ProjectTitle", parent=styles["BodyText"], fontName="Helvetica-Bold",
        fontSize=8.3, leading=10, textColor=navy, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="ProjectMeta", parent=styles["BodyText"], fontSize=7, leading=8.5,
        textColor=muted, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="ProjectDesc", parent=styles["BodyText"], fontSize=7.4, leading=9,
        textColor=navy, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="SmallCenter", parent=styles["BodyText"], fontSize=7, leading=9,
        textColor=muted, alignment=TA_CENTER,
    ))

    def esc(value: object) -> str:
        return (str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

    story = [
        Paragraph("Shaswat Trusharkumar Patel", styles["Name"]),
        Paragraph("Computer Engineering Student · Full-Stack Developer", styles["Role"]),
        Paragraph(
            "CHARUSAT, Anand, Gujarat · shsaswatpatel111@gmail.com · +91 8160043432<br/>"
            f'<link href="https://github.com/{esc(USERNAME)}" color="#315fba">GitHub</link> · '
            '<link href="https://linkedin.com/in/shaswat-patel-b96987332" color="#315fba">LinkedIn</link> · '
            '<link href="https://leetcode.com/u/Shsawat_651/" color="#315fba">LeetCode</link>',
            styles["SmallCenter"],
        ),
        Spacer(1, 4),
        Paragraph("CAREER OBJECTIVE", styles["Section"]),
        Paragraph(
            "Computer Engineering student seeking software engineering or AI/ML internship opportunities, "
            "bringing hands-on web development, problem-solving, and collaborative project experience.",
            styles["BodySmall"],
        ),
        Paragraph("EDUCATION", styles["Section"]),
        Paragraph("<b>Bachelor of Engineering in Computer Engineering</b> · CHARUSAT", styles["BodySmall"]),
        Paragraph("2024–2028 · Gujarat, India", styles["ProjectMeta"]),
        Paragraph("TECHNICAL SKILLS", styles["Section"]),
        Paragraph(
            "<b>Languages:</b> C, C++, Java, JavaScript, Python · "
            "<b>Web:</b> React, Node.js, Express, HTML, CSS, REST APIs · "
            "<b>Data/Tools:</b> SQL, MySQL, MongoDB, Git, GitHub, Docker",
            styles["BodySmall"],
        ),
        Paragraph(f"PROJECTS & GITHUB REPOSITORIES ({len(repositories)})", styles["Section"]),
        Paragraph(
            "Automatically synced from all public, non-fork repositories owned by "
            f'<link href="https://github.com/{esc(USERNAME)}" color="#315fba">{esc(USERNAME)}</link>.',
            styles["ProjectMeta"],
        ),
        Spacer(1, 2),
    ]

    # Keep project entries compact so the live project list begins on page one.
    for repo in repositories:
        title = esc(repo["name"])
        url = esc(repo["url"])
        description = shorten(repo["description"].replace("\n", " ").strip(), width=210, placeholder="…")
        description = esc(description)
        language = esc(repo["language"])
        updated = repo["updated_at"][:10] if repo["updated_at"] else "Unknown"
        project = [
            Paragraph(f'<link href="{url}" color="#315fba"><b>{title}</b></link>', styles["ProjectTitle"]),
            Paragraph(f"{language} · Updated {esc(updated)} · {repo['stars']} stars", styles["ProjectMeta"]),
            Paragraph(description, styles["ProjectDesc"]),
        ]
        story.append(KeepTogether(project))
        story.append(Spacer(1, 2))

    story.extend([
        Spacer(1, 3),
        Paragraph(
            f"Generated automatically from GitHub · Updated {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
            styles["SmallCenter"],
        ),
    ])
    doc.build(story)


def main() -> int:
    repositories = fetch_repositories()
    if not repositories:
        raise RuntimeError("GitHub returned no eligible repositories; refusing to overwrite resume data.")
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(json.dumps({
        "username": USERNAME,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repository_count": len(repositories),
        "repositories": repositories,
    }, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    generate_pdf(repositories)
    print(f"Synced {len(repositories)} public, non-fork repositories for {USERNAME}.")
    print(f"Wrote {DATA_FILE.relative_to(ROOT)} and {PDF_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"Resume sync failed: {error}", file=sys.stderr)
        raise SystemExit(1)
