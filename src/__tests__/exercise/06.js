// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  //
  // 🐨 create a deferred promise here
  //
  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)
  //
  // 🐨 so call mockImplementation on getCurrentPosition
  // 🐨 the first argument of your mock should accept a callback
  // 🐨 you'll call the callback when the deferred promise resolves
  // 💰 promise.then(() => {/* call the callback with the fake position */})
  //
  // 🐨 now that setup is done, render the Location component itself
  //
  // 🐨 verify the loading spinner is showing up
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  //
  // 🐨 resolve the deferred promise
  // 🐨 wait for the promise to resolve
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  // act(() => {})
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)
  // 🐨 verify the latitude and longitude appear correctly
})

/*
eslint
  no-unused-vars: "off",
*/
