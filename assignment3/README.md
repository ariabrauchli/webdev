# Assignment 3
## Components
<img width="339.33" height="255.66" alt="checklist" src="https://i.imgur.com/HCPDRQp.png" />

This is my mock up checklist
I broke the app into 4 main components:

* App – The overall application; contains all other components.

* List – Displays all tasks.

* List Item – Shows the task name and completion status; users can mark tasks as done.

* Checkbox -  I can check things off when they are done
Above is my simple mockup for my checklist app. A user can: add items to the to-do list, mark items as done, or delete individual items from the list entirely.

## UI Minimal Representation
<img width="339.33" height="255.66" alt="ui" src="https://i.imgur.com/K81fbLM.png" />


Since the application can be broken down into four major components, the hierarchy is as follows:

* App

* Task List

* Task Item (multiple)

* Data and State

We have several pieces of data in the application:

* The text input by the user for a new task

* The list of tasks

* The completion status of each task

We can determine which of these are state by following a few rules:

1. Does it remain unchanged over time → **NOT STATE**

2. Is it passed in from a parent via props? → **NOT STATE**

3. Can it be computed from existing state or props? → **NOT STATE**

Following these rules, I determined:

1. Text input → **STATE**

2. Task list → **STATE**

3. Completion status of a task → **Not State** (can be derived from task list)

## State Location

All state lives in the App component because multiple children depend on it:

* Task List renders based on the task list

* Task Item renders checkboxes and delete buttons based on task data

## Adding Inverse Data Flow

In the App component, I implemented helper functions to manage the task list:

* addTask - adds a new task with the input text, marked as incomplete

* removeTask - deletes a task by its ID

* toggleCompleted - toggles the completion status of a task

These functions are passed down to child components as needed to update the state in App, ensuring a single source of truth.

## Conclusion

This assignment taught me how to plan proper data flow in React, structure component hierarchies, and manage state efficiently. Understanding where the state should live and how to pass callbacks for updating it was key to making the checklist app function correctly. Overall, I struggled with this assignment and putting everything together, and when the power went out, it only made things worse. 