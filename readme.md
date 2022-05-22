# React Folder Tree Component

Simple yet flexible folder tree component with Imperative and Declarative API with build-in folder editing capabilities.

 API can be editable. :D

```jsx
<Tree
  data={[
    {
      type: "folder",
      name: "client",
      files: [
        {
          type: "folder",
          name: "Components",
          files: [
            { type: "file", name: "Button.jsx" },
            { type: "file", name: "Button.style.js" }
          ]
        },
        { type: "file", name: "setup.js" }
      ]
    },
    { type: "file", name: "index.html" },
    { type: "file", name: "style.css" }
  ]}
/>
```

