import React from 'react';
import useTitle from '../../hooks/useTitle';

const Blogs = () => {
  useTitle('Blogs')
  return (
    <>
      <section>
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8 lg:w-3/4 mt-20 font-[Poppins]">
          <h2 className="text-2xl text-center font-semibold sm:text-4xl">Blogs</h2>
          <p className="mt-4 mb-8">Sagittis tempor donec id vestibulum viverra. Neque condimentum primis orci at lacus amet bibendum.</p>
          <div className="space-y-4">
            <details className="w-full border rounded-lg">
              <summary className="px-4  py-6 font-semibold text-lg">
                What are the different ways to manage a state in a React application?
              </summary>
              <p className=" px-4 py-6 pt-0 ml-4 -mt-4 text-justify">
                <strong className='text-lg font-medium'>There are four main types of state need to properly manage in React apps:
                </strong>
                <br />
                <strong className='mt-1 inline-block font-medium'>Local (UI) state – </strong> Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.
                <br />
                <strong className='font-medium'>  Global (UI) state –</strong> Global state is data we manage across multiple components.
                Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.
                <br />
                <strong className='font-medium'>Server state – </strong>  Data that comes from an external server that must be integrated with our UI state.
                Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.
                There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.
                Fortunately there are tools such as SWR and React Query that make managing server state much easier.
                <br />
                <strong className='font-medium'>URL state – </strong> Data that exists on our URLs, including the pathname and query parameters. URL state is often missing as a category of state, but it is an important one. In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL! There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 font-semibold text-lg">How does prototypical inheritance work?</summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-justify">
                Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 font-semibold text-lg">
                What is a unit test? Why should we write unit tests?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-justify">
                In computer programming, unit testing is a software testing method by which individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.
                They enable to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase.
                <br />
                For Test-Driven Development (TDD), write unit tests before writing any implementation. This makes implementation details in code shorter and easier to understand. In this instance, the best time to write unit tests is immediately.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 font-semibold text-lg">
                What's difference between React vs Angular vs Vue?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                <strong>React Js –</strong> is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.
                <br />
                <strong>Angular Js –</strong> is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature need.
                <br />
                <strong>Vue Js –</strong> is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;