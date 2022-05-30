# EZMod

This project was created by Yu Heng and Chong Yang for Orbital 2022.

## Proposed Level of Achievement: 

Apollo 11

## Motivation

As freshmen, we had a lot of trouble planning our roadmap for modules, even with NUSMods as the information was presented over many separate pages and in a counterintuitive manner for mapping. For example, in NUSMods, the preclusions and prerequisites are displayed on a module-by-module basis, meaning students like us have to meticulously map our modules out on paper. Information regarding core Major mods are found separately on individual websites and module vacancy reports are found on EduRec. Hence, we decided to improve upon the NUSMods system and make a module planner which can do the heavy lifting and plan the modules for students based on their requirements. (Workload/semester, modules that they want to take, graduating early/on time etc etc.). 

## Aim

We hope to make module planning to be more streamlined, easier and information fed to the user. We do this by telling them when is the earliest they can take a mod, when is the latest they could take mod to graduate on time and probability of getting the mod based on past vacancy reports.

## User Stories

1. As a freshman, I want an easy module planning experience to plan ahead for my 3~4 years in NUS. 

2. As a student, I want to know if my current module plan can accommodate a specific interesting module.

3. As a student, I would like to know the chances that I will get the module I intend to take so as to be able to plan backup modules well.

## Features

A Web-based Application that provides a platform for users to plan their mods online. It also allows the client to input their Major, focus area, modules they intend to take and the following information will be provided:

1.	Whether the plan is feasible (Will the client graduate on time? Is the client allowed to take certain modules according to the time frame of the Client.

2.	Probability of getting the desired mod for each module planning cycle.

## Proposed Tech Stack

1. NodeJS
2. NUSMods API
3. React
4. MongoDB (for module bidding percentages)
5. Heroku to host our application (currently hosting on github at https://huggenguggen.github.io/EZMod/)

## Getting started

First Make sure that you have npm installed as well as all the dependencies

You can install them using 

### `npm install`

In the project directory, you can run:

### `npm start`
