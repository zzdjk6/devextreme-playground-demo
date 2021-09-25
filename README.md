# Demo app

This is a demo app as a playground to try DevExtreme-Reactive.

## Motivation

The main idea is to build something tiny based on Material-UI and using `DataGrid`, `Scheduler` and `Chart` from the library.

## What I have tried

### DataGrid

- Controlled data state
- Edit / create data using external components
- Self-made action column
- Selection and bulk action
- Sorting
- Details view
- Virtual scroll
- Column sizing
- Custom filter component
- Custom table cell
- TypeScript support
- Material-UI theming

### Scheduler

- Controlled data state
- Manage view type using external components
- Customize toolbar
- Customize calendar appearance
- Editing data using custom dialog form
- Drag and drop editing

### Chart

- Basic bar chart and pie chart
- Tooltip
- Title and legend

## What I plan to try next

// TODO

## My current evaluation

### The pros

- easy to learn (document and demos are very good)
- consistent API styles (plugin based) 
- flexible to customize in React way
- states can be fully controlled outside the component (blend well with other parts)
- use Mui as the render engine
- not hard to find answers online (the staff will usually provide runnable demo on codesandbox)

### The cons

- plugins rely on order to work properly
- needs to import things from different places (e.g., `@devexpress/dx-react-grid-material-ui` vs. `@devexpress/dx-react-grid` )

## Possible replacement for Data Grid

### Material-UI's Data Table

url: https://material-ui.com/components/tables/

Open source, many features are not available.

DevExtreme-Reactive is built based on this.

### x-grid

- url 1: https://material-ui.com/store/items/material-ui-pro/
- url 2: https://material-ui.com/components/data-grid/

Commercial, not finished yet.

### material-table

url: https://material-table.com/#/

Open source, has some advanced features but less than DevExtreme-Reactive

### mui-datatables

url: https://www.material-ui-datatables.com/

Open source, document is not good

### Other libraries

Most other data table libraries are either a wrapper of something non-React or not built with material-ui.

## Possible replacement for Scheduler

### FullCalendar

url: https://fullcalendar.io/

Commercial, not material-ui based

### react-big-calendar

url: https://github.com/jquense/react-big-calendar

Open source, not material-ui based

## Possible replacement for Chart

### React + d3.js libraries

- recharts, https://recharts.org/
- victory, https://formidable.com/open-source/victory/
- nivo, https://nivo.rocks/

Open source, React + d3.js

https://medium.com/react-courses/react-charts-built-on-d3-what-should-you-pick-rechart-visx-niv-react-vi-or-victory-adc64406caa1

### chart.js

url: https://www.chartjs.org/

Canvas-based.

### d3.js

Too low-level, should avoid if possible.

SVG-based.
