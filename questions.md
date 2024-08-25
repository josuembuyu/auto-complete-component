1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- PureComponent: One effective method for optimizing React applications is through the use of PureComponent. Unlike regular components, PureComponent automatically handles the comparison of the current state and props with the new ones, eliminating the need for manually implementing the shouldComponentUpdate() lifecycle method. This built-in comparison helps determine if the component needs to re-render, improving performance.

- Component: On the other hand, React.Component will re-render itself whenever the props change, the parent component re-renders, or if the shouldComponentUpdate() method is triggered. This approach doesn't inherently optimize the application. However, it’s simple and quick to implement, making it suitable for small UI components where re-rendering has minimal impact. Additionally, it results in cleaner code and fewer files to manage.


Example of how using PureComponent might break the app: If a PureComponent is used with complex props, such as arrays or objects, that are mutated without changing their reference, PureComponent won't detect the changes due to its shallow comparison. As a result, the UI may not update as expected.

Example usage

```js
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.data.title}</div>;
  }
}

// Passing a prop that mutates without changing reference
const data = { title: "Initial Title" };
setTimeout(() => {
  data.title = "Updated Title"; // This mutation won't trigger re-render in PureComponent
}, 1000);
```

Explaination 

- The data prop is passed to MyComponent, containing an object with a title property.

- After 1 second (setTimeout), the title property of the data object is changed from "Initial Title" to "Updated Title".

- Although the title inside the data object is updated, the data object reference itself does not change. The reference is still pointing to the same object in memory.

- React.PureComponent performs a shallow comparison, so it checks if the data prop reference has changed. Since the reference hasn't changed, PureComponent does not trigger a re-render, even though the title property inside data has been updated.

- Because React.PureComponent relies on shallow comparison, the mutation of data.title does not cause a re-render in MyComponent. The component will continue displaying "Initial Title" instead of "Updated Title".

- This behavior can be problematic if you expect the UI to update when an object's internal properties change without changing the object reference. To trigger a re-render in such cases, we should create a new object with the updated values and pass it as a prop, ensuring that the reference changes.


2. Context+ShouldComponentUpdate might be dangerous.Why is that?

Using context in combination with shouldComponentUpdate can be dangerous because shouldComponentUpdate only controls updates based on the component's props and state. If the context changes, shouldComponentUpdate won't be triggered, potentially causing the component to miss updates it should render. This can lead to inconsistent UI behavior and stale data being displayed.

3. Describe 3 ways to pass information from a component to its PARENT.

- Callback Function as Prop:

The parent component passes a callback function as a prop to the child, and the child invokes this function to pass data back to the parent.

```js
const ParentComponent = () => {
  const handleData = (data) => console.log(data);
  return <ChildComponent onData={handleData} />;
};

const ChildComponent = ({ onData }) => {
  return <button onClick={() => onData("Child Data")}>Send Data</button>;
};
```

- Lifting State Up

Both the parent and child components share the same state, with the parent controlling the state and the child component triggering state updates.

```js
const ParentComponent = () => {
  const [data, setData] = useState("");

  return <ChildComponent data={data} setData={setData} />;
};

const ChildComponent = ({ setData }) => {
  return (
    <button onClick={() => setData("New Data")}>Update Parent State</button>
  );
};
```

- Using Context

The parent component provides a context value that the child component can update.

```js
const DataContext = React.createContext();

const ParentComponent = () => {
  const [data, setData] = useState("");
  return (
    <DataContext.Provider value={{ data, setData }}>
      <ChildComponent />
    </DataContext.Provider>
  );
};

const ChildComponent = () => {
  const { setData } = useContext(DataContext);
  return (
    <button onClick={() => setData("New Data")}>Update Parent Data</button>
  );
};
```

4. Give 2 ways to prevent components from re-rendering.

- Memoization with React.memo:

Wrap a functional component with React.memo to memoize the component, preventing re-renders if the props haven't changed.

```js
const MyComponent = React.memo(({ value }) => {
  return <div>{value}</div>;
});
```

- Using shouldComponentUpdate or PureComponent:

For class components, use shouldComponentUpdate or extend PureComponent to control when a component should re-render.

```js
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

5. What is a fragment and why do we need it? Give an example where it might break my app.

- Fragment: React Fragments (<React.Fragment> or shorthand <>) allow grouping a list of children without adding extra nodes to the DOM. This is useful when rendering multiple elements inside a component without needing a wrapping element like a <div>.

Example where it might break your app:

If you use a fragment when rendering elements that require a specific parent element (like <tr> inside <table>), it could break your layout.

```js
// This will break because <tr> must be a direct child of <table>
const TableComponent = () => (
  <table>
    <>
      <tr>
        <td>Row 1</td>
      </tr>
      <tr>
        <td>Row 2</td>
      </tr>
    </>
  </table>
);
```

6. Give 3 examples of the HOC pattern.

- Authentication: A higher-order component can check whether a user is authenticated before rendering a component.

```js
const withAuth = (Component) => (props) => {
  return isAuthenticated() ? (
    <Component {...props} />
  ) : (
    <Redirect to="/login" />
  );
};
```

- Logging: A HOC can log every time a component is rendered.

```js
const withLogging = (Component) => (props) => {
  console.log("Component is rendering");
  return <Component {...props} />;
};
```

- Error Boundary: A HOC can catch errors in a component tree and display a fallback UI.

```js
const withErrorBoundary = (Component) => {
  return class extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) return <div>Something went wrong</div>;
      return <Component {...this.props} />;
    }
  };
};
```

7. What's the difference in handling exceptions in promises, callbacks, and async/await?

- Callbacks: Errors in callbacks are typically handled by passing an error object as the first argument to the callback. This requires the caller to manually check for errors.

```js
function fetchData(callback) {
  // Simulate async operation
  setTimeout(() => {
    try {
      let data = "data";
      callback(null, data); // success
    } catch (error) {
      callback(error); // error
    }
  }, 1000);
}
```

- Promises: Errors are handled using .catch() which captures any errors that occur in the promise chain.

```js
fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

- async/await: async/await simplifies promise handling and allows using try/catch for error handling.

```js
async function fetchData() {
  try {
    const data = await getData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

8. How many arguments does setState take and why is it async?

setState takes two arguments, the new state or the function that returns the new state and an optional callback function that runs after the state has been updated and the component has re-rendered

setState is asynchronous to improve performance by batching multiple state updates together. This prevents unnecessary re-renders and allows React to manage updates more efficiently.

9. List the steps needed to migrate a Class to a Function Component.

- Convert the class definition to a function: Change the class keyword to function and remove the render method.

- Replace state with useState: Convert class state to useState hooks.

```js
const [state, setState] = useState(initialState);
```

- Replace lifecycle methods: Convert lifecycle methods to useEffect.

```js
useEffect(() => {
  // ComponentDidMount
}, []); // Empty array for componentDidMount equivalent
```

- Remove this keyword: Use state and props directly, without the this keyword.

- Prop handling: Ensure props are correctly passed and accessed.

10. List a few ways styles can be used with components.

- Inline styles: Directly apply styles using the style attribute.

```js
<div style={{ color: "red", fontSize: "20px" }}>Styled Text</div>
```

- CSS Modules: Import CSS modules and apply scoped styles.

```js
import styles from "./Component.module.css";
<div className={styles.redText}>Styled Text</div>;
```

- Styled-components: Use the styled-components library to create styled components.

```js
import styled from "styled-components";
const StyledDiv = styled.div`
  color: red;
  font-size: 20px;
`;
<StyledDiv>Styled Text</StyledDiv>;
```

- Tailwind CSS: Use utility-first CSS framework classes for styling.

<div className="text-red-500 text-xl">Styled Text</div>;

- Global CSS: Apply global styles by importing a CSS file.

```js
import "./global.css";
```

11. How to render an HTML string coming from the server.

To render an HTML string received from the server in React, we can use the dangerouslySetInnerHTML attribute. However, it is important to be cautious as it can lead to XSS vulnerabilities if the HTML content is not sanitized properly.

```js
function MyComponent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

// Usage
const serverHtmlString =
  "<p>This is <strong>bold</strong> text from the server.</p>";
<MyComponent htmlString={serverHtmlString} />;
```

dangerouslySetInnerHTML is React's replacement for using innerHTML in the browser DOM. It is called "dangerous" because it directly inserts the HTML string into the DOM, which can be a security risk if the content is not trusted or sanitized.

