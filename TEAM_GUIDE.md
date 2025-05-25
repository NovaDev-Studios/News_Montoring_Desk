# 🧑‍💻 NovaDev Studios - Git Collaboration Guide

Welcome to the `News_Monitoring_Desk` project!  
This guide defines how our 5-person team should use Git and GitHub to collaborate efficiently and safely.

---

## 📌 1. Branch Naming Convention

All work should be done on branches – **never directly on `main`**.

| Type       | Branch Format Example              |
|------------|------------------------------------|
| Feature    | `feature/user-login`               |
| Bug Fix    | `bugfix/fix-login-redirect`        |
| UI Change  | `ui/dashboard-header-update`       |
| Refactor   | `refactor/simplify-auth-handler`   |
| Hotfix     | `hotfix/missing-env-check`         |

---

## 🧾 2. Commit Message Format

Use clear, emoji-coded commit messages:

| Emoji | Type        | Example                          |
|-------|-------------|----------------------------------|
| ✅    | Feature      | `✅ Added user registration`      |
| 🐛    | Bug fix      | `🐛 Fixed login redirect issue`    |
| 💄    | UI update    | `💄 Updated button styling`        |
| 🔥    | Cleanup      | `🔥 Removed unused imports`        |
| ♻️    | Refactor     | `♻️ Refactored auth middleware`    |
| 🔒    | Security     | `🔒 Added password validation`     |
| 🧪    | Test         | `🧪 Added tests for auth route`    |

---

## 🔁 3. Daily Workflow

> Run this every morning:

```bash
cd D:\news_monitoring_desk
git checkout main
git pull origin main
