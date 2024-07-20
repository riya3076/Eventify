/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import NewsCard from "./NewsCard";

export default function Stories() {
  return (
    <section className="my-14">
      <Container>
        <div className="pt-14 pb-4 flex items-center lg:flex-nowrap flex-wrap gap-1 bg-[#F7F7F7]">
          <article className="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:ml-14">
            <SectionTitle title="Success Stories" />
            <p className="text-[#5B6469]">Let's see what people say about us</p>
          </article>
          <div className="flex gap-4 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto pr-4">
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard 
                text="Joining the fitness program completely transformed my lifestyle. I've never felt more energized!"  
                name="Emily R." 
                holder="emily_fitness_guru"/>
              <NewsCard 
                text="The cooking classes were a game changer for my diet. Delicious and healthy meals are now a part of my daily routine." 
                name="Mark T." 
                holder="mark_the_chef" />
              <NewsCard 
                text="I've learned so much from the online courses, advancing my career further than I thought possible." 
                name="Linda S." 
                holder="linda_skills" />
            </div>
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard 
                text="The travel guide offered insights that made our trip unforgettable. Highly recommend their services!" 
                name="Alex D." 
                holder="alex_explorer" />
              <NewsCard 
                text="Thanks to the personal finance advice, I'm now much more confident in managing my investments." 
                name="Sophie K." 
                holder="sophie_wealth" />
              <NewsCard 
                text="Adopting the mindfulness practices introduced has brought a new level of calm and focus to my life." 
                name="Brian M." 
                holder="brian_mindful" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
