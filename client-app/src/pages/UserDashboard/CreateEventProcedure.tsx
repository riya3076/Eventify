/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/Landing/SectionTitle";
import { how_1, how_2, how_3 } from "../../assets/home";

interface CreateEventStep {
    id: number;
    icon: string;
    heading: string;
    text: string;
}

const steps: CreateEventStep[] = [
    {
        id: 1,
        icon: how_1,
        heading: "Fill Event Details",
        text: "Provide all necessary details for your event, including title, description, date, and location.",
    },
    {
        id: 2,
        icon: how_2,
        heading: "Payment Setup",
        text: "Choose your preferred payment methods. Set up tickets for paid events or keep it free.",
    },
    {
        id: 3,
        icon: how_3,
        heading: "Done",
        text: "Review your event details, submit for approval, and start promoting your event!",
    },
];

const CreateEventProcedure: React.FC = () => {
    return (
        <section className="my-14">
            <Container>
                <SectionTitle title="How to Create Events" />
                <div className="bg-[#C3DAD3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
                        {steps.map((step: CreateEventStep) => (
                            <div className="text-center flex flex-col items-center justify-center" key={step.id}>
                                <img src={step.icon} alt="icon" className="pb-4 w-24" />
                                <h1 className="font-bold text-lg py-4">{step.heading}</h1>
                                <p>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CreateEventProcedure;
