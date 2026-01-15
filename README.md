[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/sqlGy7Yk)
# Challenge 8 - Slicing Figma Movie App with Tanstack Query

# Description

In this assignment, you'll translate a provided Figma design into a functional webpage using React Vite, Tailwind CSS, and Tanstack Query.

You'll be provided with a basic project setup, and your task will be to implement the design by writing components that reusable and utilizing Tailwind's classes.

And you also provided REST API from [The MovieDB](https://developer.themoviedb.org/docs/getting-started), and use it with Tanstack Query and axios to communicated.

Step by Step to use The MovieDB.

- [Register](https://www.themoviedb.org/signup) to The MovieDB
- if you already have an account [Login](https://www.themoviedb.org/login?to=read_me&redirect=%2Fdocs%2Fgetting-started)
- Save API Read Access Token and Api Key inside your `.env`. you can find the API Read Access Token and Api Key [here](https://www.themoviedb.org/settings/api)
- Open API Documentation [here](https://developer.themoviedb.org/reference/getting-started)
- you can use `https://image.tmdb.org/t/p/original/{backdrop_path / poster_path}` to retrieve image from The MovieDB

The design for this assignment is located at the following Figma link:

[Figma Design Link](https://www.figma.com/design/PjR3Adxi8eZbS2cmdPuG52/Front-End-Developer-Test---Movie-Explorer-App?node-id=8411-143671&p=f)

The goal is to assess your ability to:

- Interpret a design from Figma.
- Create a reusable component
- Structure a webpage with React Vite.
- Apply styles using Tailwind CSS.
- Create a responsive layout.
- Routing and rendering method.
- Implement Tanstack Query

# Assignment Objectives

- Figma to HTML: Accurately translate the Figma design into HTML. Create the necessary HTML elements to structure the page (divs, sections, headers, etc.).
- Tailwind CSS Styling: Use Tailwind CSS classes to style the HTML elements. Pay close attention to:
- Layout (Flexbox, Grid).
- Spacing (padding, margin).
- Typography (font sizes, weights, colors).
- Colors and Backgrounds.
- esponsive design (using Tailwind's responsive prefixes, e.g., md:, lg:).
- Responsive Design: Ensure your implementation is responsive across different screen sizes, as defined in the Figma design. Use Tailwind's responsive modifiers.
- Adherence to Design: Your final webpage should closely match the visual design provided in the Figma file.
- Implement The MovieDB using Tanstack Query and Axios.

# Getting Started

for this project first, then to run the app, run

```
npm run dev
```

on terminal

Study the Figma Design: Open the Figma link and thoroughly examine the design. Understand the layout, spacing, colors, typography, and responsive behavior.

HTML Structure: Open the public/index.html file. Begin by structuring the page with HTML elements that mirror the design.

Tailwind CSS: Use Tailwind CSS classes directly within your HTML elements to apply styles. For example:

<div class="flex justify-center items-center">...</div>

<h1 class="text-3xl font-bold text-blue-600">...</h1>

Test in the Browser: Run npm run dev to see it on your browser

Iterate: Continue to refine your HTML and Tailwind CSS until your webpage accurately matches the Figma design.

# Important Notes

You can modify the folder structure only on src and public folder, don't change anything related to project setup

Tailwind CSS Documentation: Refer to the official Tailwind CSS documentation (https://tailwindcss.com/docs) for information on available classes and how to use them.

Figma Inspection: Use the "Inspect" feature in Figma to get precise measurements, colors, and font styles from the design.

# Evaluation System

The evaluation for this assignment will be based on the following criteria:

1.  **Basic concept and project structure:** How you understand the concept of React Vite and how you manage the project structure
2.  **Tanstack Query** How you understand about Tanstack Query to retrieve data from The MovieDB API.

---

# How to Upload your Challenge

Check this module: [click this](https://orchid-clematis-3e4.notion.site/Panduan-Penggunaan-Git-Untuk-Upload-Assignment-e2d80a19b3684f5d8f1a4209dcf85445?pvs=73)

---

🎉 Congratulations on working on this assignment! Utilize the _playground_ feature in Figma to help you understand how the design should look on various devices. Keep experimenting and don't hesitate to look for references if you encounter difficulties. You can definitely produce great work! 🚀 Keep up the spirit, cheers! 🎈
