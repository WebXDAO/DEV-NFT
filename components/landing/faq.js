import React from 'react';
import { useEffect, useState } from 'react'


function Faq() {

  // Faq section data
  const faqs = [
    {
      question: 'Question 1',
      answer:
        'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
      question: 'Question 2',
      answer:
        'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    // More questions...
  ]


  return (
    <>
      {/* FAQ */}
      <div className="bg-background mx-auto px-10">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-main">Frequently asked questions</h2>
              <p className="mt-4 text-lg text-text">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a href="#" className="font-medium text-primary">
                  customer support
                </a>{' '}
                team.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg leading-6 font-medium text-main">{faq.question}</dt>
                    <dd className="mt-2 text-base text-text">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}


export default Faq;
