/*helpers is used for global functions*/
/*show or hide some parts of components*/
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router';
import date from 'date-and-time';

/* fct to conver date from ISO to YYYY/MM/DD HH:mm:ss and then replace '/' by '-'*/
export function convertDate(arg){
  let now = new Date(arg);
  let convertDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
  let regex = /\//ig;
  let convertedDateStrike = convertDate.replace(regex, '-');
  return convertedDateStrike;
}

/*API REQUESTS*/
/*Register -POST*/
export function appRegister(myJSON){
  axios.post("/api/register", myJSON)
  .then(function (response) {
      console.log("registered!!");
      alert("You have successfully registered! Please login!");
      window.location = '/login';
  })
  .catch(function (error) {
      console.log("Email already used");
      alert("Email already used, choose another one");
  });
}

/*User -GET - user */
export function appGetUser(){
  axios(
    {
      method: 'GET',
      url: "/api/user",
      headers:
        {
          'Content-Type' : "application/json",
          'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem("token-storage"))
        },
  })
  .then(function (response) {
      console.log(response.data);
      sessionStorage.setItem('user-id-storage', JSON.stringify(response.data.id));
      sessionStorage.setItem('user-name-storage', JSON.stringify(response.data.name));
      window.location = '/';
    })
  .catch(function (error) {
    console.log(error);
  })
}

/*Login -POST - user/pw */
export function appLogin(myJSON){
  axios.post("api/login", myJSON)
    .then(function (response) {
        sessionStorage.setItem('token-storage', JSON.stringify(response.data.access_token));
        alert("You have successfully loged in!");
        //fct to retrieve some datas id/name
        appGetUser();
    })
    .catch(function (error) {
        alert("Problem, check your email and/or password!");
    });
}

/*Logout-POST */
export function appLogout(){
  let config = {
    headers: {'Authorization': "bearer " + JSON.parse(sessionStorage.getItem("token-storage"))}
  };
  let bodyParameters = {
   key: "value"
  }
  axios.post("/api/logout", bodyParameters, config)
  .then(function (response) {
    //console.log(response);
    sessionStorage.removeItem("token-storage");
    sessionStorage.removeItem("user-id-storage");
    sessionStorage.removeItem("user-name-storage");
    window.location = '/';
  })
  .catch(function (error) {
    console.log(error);
    sessionStorage.removeItem("token-storage");
    sessionStorage.removeItem("user-id-storage");
    sessionStorage.removeItem("user-name-storage");
    window.location = '/';
  })
}

/*Get ALL events-GET */
export function appGetEvent(eventList){
    axios.get("/api/events")
      .then (response => eventList.setState({
        eventList : response.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }

/*Get FUTURE events -GET */
export function appGetFutureEvent(eventList){
    axios.get("/api/futurEvent")
      .then (response => eventList.setState({
        eventList : response.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }

/*Get Past Event -GET */
export function appGetPastEvent(eventList){
  axios.get("/api/pastEvent")
    .then (response => eventList.setState({
      eventList : response.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

/*Get Event by ID-GET */
export function appGetEventByID(eventID, eventList){
  axios.get("/api/event/"+ eventID)
  .then (response => eventList.setState({
    eventList : response.data.event,
    suscribersList : response.data.participants
  }))
  .catch(function (error) {
    console.log(error);
  })
}

/*Add Event-POST */
export function appAddEvent(myJSON){
  axios(
    {
      method: 'POST',
      url: "/api/event",
      headers:
        {
          'Content-Type' : "application/json",
          'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem("token-storage"))
        },
      data: JSON.stringify(myJSON)
  })
  .then(function (response) {
    alert("Event successfully added!");
    window.location = '/';
    })
  .catch(function (error) {
    console.log(error);
  })
}

/*Update Event-PUT */
export function updateEvent(eventID, myJSON){
  axios(
    {
      method: 'PUT',
      url: "/api/event/"+eventID,
      headers:
        {
          'Content-Type' : "application/json",
          'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem("token-storage"))
        },
      data: JSON.stringify(myJSON)
  })
  .then(function (response) {
    alert("Event successfully added!");
    window.location = '/';
    })
  .catch(function (error) {
    console.log(error);
  })
}

/*Suscribe-POST*/
export function suscribeEvent(eventID){
  axios(
    {
      method: 'POST',
      url: "/api/inscription/"+eventID,
      headers:
        {
          'Content-Type' : "application/json",
          'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem("token-storage"))
        },
  })
  .then(function (response) {
    console.log(response);
    })
  .catch(function (error) {
    console.log(error);
  })
}

/*Unsuscribe-POST*/
export function unsuscribeEvent(eventID){
  axios(
    {
      method: 'POST',
      url: "/api/unsubscribe/"+eventID,
      headers:
        {
          'Content-Type' : "application/json",
          'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem("token-storage"))
        },
  })
  .then(function (response) {
    console.log(response);
    })
  .catch(function (error) {
    console.log(error);
  })
}
//\API REQUESTS
