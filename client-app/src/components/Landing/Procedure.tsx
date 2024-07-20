/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { how_1, how_2, how_3, how_4 } from "../../assets/home";

interface HowItWorksItem {
    id: number;
    icon: string;
    heading: string;
    text: string;
}

const items: HowItWorksItem[] = [
    {
        id: 1,
        icon: how_1,
        heading: "Discover Events",
        text: "Browse through a wide range of events to find those that spark your interest.",
    },
    {
        id: 2,
        icon: how_2,
        heading: "Book Your Spot",
        text: "Easily register or buy tickets for events with just a few clicks, ensuring a hassle-free experience.",
    },
    {
        id: 3,
        icon: how_3,
        heading: "Enjoy the Experience",
        text: "Attend and enjoy the event with friends, family, or solo. There's something for everyone.",
    },
    {
        id: 4,
        icon: how_4,
        heading: "Host Your Own",
        text: "Use our platform to organize and promote your own events, reaching thousands of potential attendees.",
    },
];


const Procedure: React.FC = () => {
    return (
        <section className="my-14">
            <Container>
                <SectionTitle title="How It Works" />
                <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
                        {items.map((item: HowItWorksItem) => (
                            <div className="text-center flex flex-col items-center justify-center" key={item.id}>
                                <img src={item.icon} alt="icon" className="pb-4 w-24" />
                                <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Procedure;
