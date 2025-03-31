
# ✅ ToDay ToDone

**ToDay ToDone** is a clean and simple task manager that only looks at *Today* and *Tomorrow*. No due dates, tags, categories, reminders, or distractions.

It’s designed to be a quick, no-fuss brain dump: jot down anything that comes to mind, decide whether it needs to happen **now** or **later,** and drop it in the right place. That’s it.

This works well for people (like me) who naturally think in terms of *"right now"* vs. *"not right now."* With a shortcut to the page on my phone's home screen, I can get thoughts out of my head instantly without fiddling with features, settings, or structure. It’s not about organizing tasks; it’s about getting them done.

---

## 🧠 How It Works

The app is split into **Today** and **Tomorrow** sections:

- **Today**
  Click the **New Task** button to add a task to the **Today** list.

  - **Task Options**
    Each task has three actions:
    - ✅ **Check** – Mark as complete
    - 🖊️ **Edit** – Update the task text
    - ➡️ / ⬅️ **Move** – Send the task to the other list (Today ↔ Tomorrow)

- **Daily Refresh**  
  At the start or end of the day, click the **Refresh** button in the **Tomorrow** section:
  - ✔️ Completed tasks are cleared
  - 🔄 Remaining Tomorrow tasks are moved to Today

---

## 🛠️ Tech Stack

- **HTML, CSS, JavaScript**
- **Storage:** `localStorage` (everything is saved locally in your browser)

---

## 📦 Getting Started

You can either:

### ▶️ Use It Online

Just visit [stbow's website](https://stbow.github.io/ToDay-ToDone/)

### 🧑‍💻 Run It Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/stbow/ToDay-ToDone.git
   cd ToDay-ToDone
   ```

2. Download the `Assets` folder, `index.html`, `styles.css`, and `script.js`. Open `index.html` in your browser.

---

## 📁 Folder Structure

```
/ToDay-ToDone
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License.
