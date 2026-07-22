

# Part 1: Detailed System Explanation

## 1. Project Vision

The project is **not** an AI chatbot.

The chatbot is only one interface.

The real product is a **Planning Engine** that continuously observes changes in the user's context and keeps the user's plan synchronized with reality.

Its responsibilities are:

* Maintain context.
* Understand changes.
* Re-plan whenever necessary.
* Learn user behaviour.
* Notify only when beneficial.

The goal is:

> **The user's plan should automatically evolve as their life changes.**

---

# 2. Context Sources

Context is everything the AI knows about the user.

Examples:

### Internal

* Todo List
* Habits
* Goals
* AI Chat
* User Preferences
* Long-term Memory
* Reminder History
* Notification History
* Study Statistics
* Productivity Analytics

### External

* Google Calendar
* Gmail
* Clock
* Time
* Location
* Weather (optional)
* Fitness APIs (future)

Each source owns its own data.

No duplicate copies should become permanent.

---

# 3. Event Watchers

Every context source has a watcher.

Their job is simply to detect change.

Examples:

Google Calendar Watcher

```text
Meeting Added

↓

CALENDAR_CHANGED
```

Todo Watcher

```text
Task Completed

↓

TASK_COMPLETED
```

Clock Watcher

```text
Every hour

↓

TIME_EVENT
```

These watchers do NOT think.

They only report.

---

# 4. Scheduler

Not every important event comes from data changes.

Some come from time.

Examples

Every

* Morning
* Afternoon
* Evening
* Midnight
* Every 30 minutes

The scheduler wakes the planner.

This creates hybrid behaviour.

Reactive to events.

Reactive to time.

Result:

Feels proactive.

---

# 5. Context Manager

This is the heart of the backend.

Whenever something happens:

Instead of processing only the event,

it gathers the latest information.

Example

```text
Calendar changed

↓

Fetch Calendar

↓

Fetch Todo

↓

Fetch Habits

↓

Fetch Preferences

↓

Build Current Context
```

The planner always receives the CURRENT WORLD.

Not just one event.

---

# 6. Change Detector

Before planning,

compare

Old Context

vs

New Context

Determine

What actually changed.

Example

```text
Old

Physics 6PM

↓

New

Physics 7PM

↓

Difference

Only study time changed.
```

No need to re-plan the whole week.

---

# 7. Planning Engine (Core)

This is the most important module.

It answers

> Given the current world,
> what should happen now?

Input

* Current Context
* Event
* User Behaviour
* Time
* AI Memory

Output

Recommendations

Examples

Move Task

Delay Reminder

Ask User

Increase Study Goal

Cancel Workout

Move Calendar Block

No Action

The planner never edits databases directly.

---

# 8. AI Modules

Instead of one giant AI,

specialize them.

## Planning AI

Responsible for

Planning.

---

## Message AI

Writes messages.

Example

Planner

```text
Notify user.
```

Message AI

```text
You haven't studied today.

Would you like to spend 30 minutes on Physics tonight?
```

---

## Learning AI

Analyzes behaviour.

Example

User ignored reminders.

Why?

Maybe evenings don't work.

Adjust future planning.

---

# 9. Action Layer

Planner returns recommendations.

Services execute them.

Example

Planner

```json
[
 {
  "moveTask":"Physics",
  "time":"18:00"
 }
]
```

Todo Service executes.

Planner never touches Todo Database.

---

# 10. User Behaviour Learning

This is where the assistant becomes personal.

Observe

* Reminder ignored
* Reminder accepted
* Task completed late
* Task skipped
* Study time
* Preferred hours

After weeks

The assistant discovers

* Best study hours
* Worst productivity hours
* Frequently skipped habits
* Accurate task duration

Planning becomes personalized.

---

# 11. AI Chat

This is separate.

User asks

> Plan tomorrow.

Planner uses current context.

Returns plan.

The planner can also accept natural language updates.

Example

> I'm going to Rahul's house for three hours.

AI extracts

Arrival

Duration

Reason

Updates planner.

No manual editing required.

---

# 12. Notification Engine

Notification is NOT the primary action.

It is just one action.

Possible outputs

* Notify
* Re-plan
* Update Todo
* Update Calendar
* Ask User
* Do Nothing

---

# 13. Analytics

Track

* Productivity
* Completion Rate
* Average Study Time
* Reminder Success
* Habit Success
* Weekly Trends

This also feeds the planner.

---

# 14. Long-Term Memory

Stores

* User preferences
* Behaviour
* Important events
* Goals
* Conversation summaries

Not every chat.

Only meaningful information.

---

# 15. Frontend

Main Screens

Dashboard

AI Chat

Calendar

Todo

Habits

Analytics

Settings

Notifications

Entire UI should be responsive.

---

# Part 2: Overall Pipeline

```text
                                    USER
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │    Mobile / Web UI    │
                          └───────────────────────┘
                                      │
                                      ▼
                                Backend API
                                      │
──────────────────────────────────────────────────────────────────────────

                     CONTEXT SOURCES (Single Owners)

 Google Calendar
 Todo List
 Habits
 Notes
 Preferences
 Goals
 AI Memory
 Analytics
 Time
 Gmail
 Other Integrations

──────────────────────────────────────────────────────────────────────────
                                      │
                                      ▼

                            EVENT WATCHERS
                     (Observe Context Changes)

      Calendar Changed
      Task Completed
      Reminder Ignored
      Goal Updated
      Email Received
      etc.

                                      │
                                      ▼

                               SCHEDULER
                    (Hourly / Morning / Night)

                                      │
                                      ▼

                        CONTEXT MANAGER
      Collect latest state from every required source

                                      │
                                      ▼

                         CHANGE DETECTOR

                 Old Context
                        │
                        ▼
                 New Context
                        │
                        ▼
                What actually changed?

                                      │
                                      ▼

                        PLANNING ENGINE
             (Rules + Logic + Planning AI)

Questions

Should anything happen?

What should change?

Should user be interrupted?

Should schedule change?

                                      │
                                      ▼

                 ACTION RECOMMENDATIONS

      Move Task
      Create Reminder
      Cancel Reminder
      Update Todo
      Update Calendar
      Ask User
      Learn Behaviour
      Do Nothing

                                      │
        ┌──────────────┬──────────────┬───────────────┐
        ▼              ▼              ▼               ▼

 Todo Service    Calendar Service  Notification   Learning
                                    Service        Service

        ▼              ▼              ▼               ▼

              Updated User Environment

──────────────────────────────────────────────────────────────────────────

                        AI CHAT INTERFACE

User

↓

Natural Language

↓

Intent Extraction

↓

Planning Engine

↓

Actions

↓

Updated Context

↓

Everything remains synchronized
```

---

# Final Thoughts

If I had to summarize your architecture in one sentence, it would be:

> **A hybrid, event-driven, context-aware planning platform where AI continuously maintains an accurate model of the user's world, adapts plans as reality changes, learns from behavior over time, and treats notifications as just one of many possible actions.**

One suggestion for future versions is to think about **confidence**. Every AI-generated recommendation could include a confidence score (e.g., 0–100%). Low-confidence changes would result in the assistant asking for confirmation ("Should I move your study session to 6 PM?"), while high-confidence changes (like removing a reminder for a task you already completed) could be applied automatically. This keeps the system helpful without feeling intrusive or making risky assumptions.
