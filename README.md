## Mts-system-frontend


In the project directory, you can run:

### `yarn install`

Install packages before running the app.

Yarn is recommended. you can also use NPM.

### `yarn build`

Build static material for current app.

### `yarn start`

Runs the app in the normal mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will NOT reload if you make edits.<br />

### `yarn develop`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn electron`

Runs the app as a desktop application.

The application will reload if you make edits.
You will also see any lint errors in the console.

### `backend`

If you can't connect to mts-system-backend and databases

add this in './src/pages/App.js'

```
import '../mocks/mocks';
```

@Shanghai Jiaotong University 2020
