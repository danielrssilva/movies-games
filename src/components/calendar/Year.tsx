import { motion, AnimatePresence } from "framer-motion";
import Month from "./Month";
import Day from "./Day";
import { dayAnimation } from "../../helpers/animations";

interface YearProps {
  activities: Activity[];
  mondays: Date[];
  isLoading: boolean;
}

const Year = (props: YearProps) => {
  const { activities, mondays, isLoading } = props;
  return (
    <>
      <motion.div
        variants={dayAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Month
          date={mondays[0]}
          activityCount={
            activities.filter(
              (activity) =>
                activity.date.getMonth() === mondays[0]?.getMonth() &&
                activity.date.getFullYear() === mondays[0]?.getFullYear()
            ).length
          }
          weeksCount={0}
          isLoading={isLoading}
        />
      </motion.div>
      {mondays?.map((monday, index) => {
        if (
          index !== 0 &&
          monday.getMonth() !== mondays[index - 1]?.getMonth()
        ) {
          return (
            <AnimatePresence
              key={`month-${monday.getMonth()}-${monday.getFullYear()}`}
            >
              <motion.div
                key={`month-${monday.getMonth()}-${monday.getFullYear()}`}
                variants={dayAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Month
                  date={monday}
                  activityCount={
                    activities.filter(
                      (activity) =>
                        activity.date.getMonth() === monday.getMonth()
                    ).length
                  }
                  weeksCount={0}
                  isLoading={isLoading}
                />
              </motion.div>
              <motion.div
                key={`day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
                variants={dayAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Day
                  activity={
                    activities.find(
                      (activity) =>
                        activity.date.getDate() === monday.getDate() &&
                        activity.date.getMonth() === monday.getMonth() &&
                        activity.date.getFullYear() === monday.getFullYear()
                    ) || null
                  }
                  key={index}
                  day={monday.getDate()}
                  month={monday.getMonth() + 1}
                  year={monday.getFullYear()}
                  isLoading={isLoading}
                />
              </motion.div>
            </AnimatePresence>
          );
        } else {
          return (
            <motion.div
              key={`day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
              variants={dayAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Day
                activity={
                  activities.find(
                    (activity) =>
                      activity.date.getDate() === monday.getDate() &&
                      activity.date.getMonth() === monday.getMonth() &&
                      activity.date.getFullYear() === monday.getFullYear()
                  ) || null
                }
                key={index}
                day={monday.getDate()}
                month={monday.getMonth() + 1}
                year={monday.getFullYear()}
                isLoading={isLoading}
              />
            </motion.div>
          );
        }
      })}
    </>
  );
};

export default Year;
