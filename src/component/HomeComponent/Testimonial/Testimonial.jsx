import Card from "./Card"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
const cards = [
    {
        id: 1,
        url: "https://i.ibb.co.com/N2mgwPB/image.jpg",
    },
    {
        id: 2,
        url: "https://i.ibb.co.com/9YyQrkP/Building-a-Successful-Mentor-Mentee-Relationship-6-Key-Principles-for-Effective-Business-Coaching.jpg",
    },
    {
        id: 3,
        url: "https://i.ibb.co.com/9Y2YYGQ/Restore-Balance-Center-Yourself-to-Achieve-Greater-Business-Certainty.jpg",
    },
    {
        id: 4,
        url: "https://i.ibb.co.com/mqTK85x/Serious-business-man-team-leader-coach-mentor-talk-to-diverse-business-people-in-office-explain-stra.jpg",
    },
    {
        id: 5,
        url: "https://i.ibb.co.com/3hdPKBF/A-good-leader-must-be-capable-of-strategic-planning-for-operational-processes.jpg",
    },
   
];
const Testimonial  = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-red-50 rounded-2xl">

            <div className="sticky top-0 flex h-screen items-center  overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonial ;