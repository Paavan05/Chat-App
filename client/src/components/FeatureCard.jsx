import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, desc, isActive, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className={`
        relative flex-shrink-0 cursor-pointer p-8 md:p-10 rounded-[32px] select-none
        w-[300px] sm:w-[380px] md:w-[420px] h-[340px] md:h-[400px]
        flex flex-col justify-between overflow-hidden border
        ${isActive
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white z-20 shadow-2xl opacity-100"
                    : "bg-[#F7F8FC] text-gray-900 border-gray-200 dark:bg-[#161617] dark:text-gray-400 dark:border-neutral-800 z-10 opacity-60 hover:opacity-100"
                }
      `}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="flex justify-between items-start">
                <h3 className={`text-3xl md:text-4xl font-semibold leading-tight tracking-tight ${isActive ? "text-white dark:text-black" : "text-gray-900 dark:text-white"}`}>
                    {title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h3>
                <div className={`p-2 w-12 h-12 relative rounded-full border ${isActive ? "border-white/20 dark:border-black/20" : "border-gray-200 dark:border-neutral-800"}`}>
                    {icon && (
                        <div className={`w-8 h-8 absolute left-3 top-2.5  ${isActive ? "text-white dark:text-black" : "text-gray-400 dark:text-gray-500"}`}>
                            {icon}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <p className={`text-base md:text-lg leading-relaxed max-w-[90%] ${isActive ? "text-white/80 dark:text-black/70" : "text-gray-500 dark:text-gray-500"}`}>
                    {desc}
                </p>
            </div>

            {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 dark:from-white/10 to-transparent pointer-events-none" />
            )}
        </motion.div>
    );
};

export default FeatureCard;
