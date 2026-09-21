---
name: token-usage-log
description: Track Codex task tokens with ccusage and a three-column Markdown log. Use when starting or resuming a project task or issue, completing work, ending a work session, or answering a token usage request. No separate measurement command is needed. Not for account quotas or billing balances.
---

# Token usage log

## Automatic task boundaries

When the user starts a concrete project task (for example, "01번 진행하자"), capture its baseline before substantive work without requiring a separate token-measurement request. When the task is completed or the user ends the work session (for example, "오늘 여기까지"), record the delta. Preserve the active baseline across follow-up messages; do not restart it on every turn or count nested work twice. After a recorded session ends, capture a new baseline when work resumes. Do not create a task for casual acknowledgements or explanatory questions alone. This is an assistant workflow instruction, not a background monitoring process or guaranteed runtime hook. If invocation or logs are unavailable, disclose the gap rather than claim automatic capture occurred.

For the current Coffee Fetch conversation, use the verified Windows session logs. Recheck the log source only if the execution environment changes; do not combine Windows and WSL totals just because both installations exist.

Use installed `ccusage` (tested with 20.0.24). On Windows use `ccusage.cmd` if PowerShell blocks the .ps1 launcher; on WSL use `ccusage` or `~/.local/bin/ccusage`. Reports: `ccusage codex session --json --offline --no-cost`; daily overview: `ccusage codex daily --offline --no-cost --timezone Asia/Seoul`.

## Scope and logs

Find the actual execution environment and log root before measuring. Windows and WSL may have independent sessions. Do not assume a WSL working directory means logs are in WSL. Inspect the report's sessionId and, if needed, the session_meta record's id/cwd to select the right session; do not print conversation contents. Never select an unrelated session merely because it is newest. Use the current thread ID when available; otherwise ask for the intended session if it cannot be identified.

ccusage defaults to the current environment's Codex home. For another root, invoke ccusage from a subprocess with a copied environment overriding CODEX_HOME for that child process only. Do not modify the user's persistent environment or Codex configuration. Never combine copied Windows/WSL logs without checking for duplicate session IDs.

## Starting a measured task

Resolve the repository and intended task/issue. Capture the selected session's `totalTokens` from JSON, along with sessionId, log root, ccusage version, task text, start time and record ID. Store this baseline locally in `.token-usage/` under the repo (ensure it is gitignored), not in the public document. Keep separate baselines per task. A session absent from the report is unknown, not zero.

For delegated work, record explicit child session IDs too. New child sessions may use a zero baseline only when verified to have been created after this task's start. If the children cannot be identified, label the result as main-session-only. ccusage handles inherited usage for supported logs; do not add parent history again.

## Finishing / recording

Read the report again and subtract the saved baseline for the exact same session(s). Sum `totalTokens` differences only; do not add cached or reasoning tokens on top of totals. Fail closed on a missing session, changed root, negative delta or incompatible data shape; record `미측정` with a short reason instead of guessing. Do not interpret estimated dollar values as subscription charges or quota consumption.

If no baseline exists, offer the verified whole-session total explicitly labeled `세션 전체`, or record `미측정 (시작 기준 없음)`; never label it task usage. Other work in the same session between snapshots is included, so disclose mixed scope. A running turn may not be fully written yet: label the result `조회 시점까지` and reconcile on the next turn if needed. Do not claim to measure tokens generated after the read.

Append one row to `docs/token-usage.md` (or the user's requested path):

| 날짜 | 처리한 일 | 토큰 사용량 |
|---|---|---|

Use Asia/Seoul date, a concise task/issue label, and e.g. `12,345 tokens (조회 시점까지·본 세션)` or `미측정 (시작 기준 없음)`. Escape table pipes and flatten newlines in task text. Store the record ID and completion state locally; when reconciling update its existing row rather than appending duplicate totals. Ask if the prior row cannot be identified safely. Do not invent historical counts or record a whole day as one task. User only wants these three columns; avoid adding dashboards or cost columns.

Updating the requested local log is within this skill's scope; committing/pushing or creating GitHub issues requires authorization from the current task or existing user instructions. Do not upload raw session logs or baseline files.

Reference: https://ccusage.com/guide/codex/
