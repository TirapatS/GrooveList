import { motion } from 'framer-motion'


const AnimatedPage = ({ children }) => {

    const animation = {
        initial: {opacity: 0},
        animate: {opacity:1},
        exit: {opacity: 0},
    }

    return (
        <motion.div variants={animation} initial={animation.initial} animate={animation.animate} exit={animation.exit} transition={{ duration: 0.2}}>
            {children}
        </motion.div>
    )
}

export default AnimatedPage