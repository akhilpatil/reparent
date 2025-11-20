// Main 15 questions for all users
const mainQuestions = [
  {
    id: 1,
    question: "When my child cries or gets upset, I feel overwhelmed too.",
    theme: "Emotional reactivity; difficulty co-regulating"
  },
  {
    id: 2,
    question: "I often feel guilty if I take time for myself instead of my child.",
    theme: "Guilt and self-neglect"
  },
  {
    id: 3,
    question: "I find it hard to stay calm when my child doesn't listen.",
    theme: "Control and impulsivity"
  },
  {
    id: 4,
    question: "I try to fix my child's problems quickly instead of just listening.",
    theme: "Need to control discomfort; fixing instinct"
  },
  {
    id: 5,
    question: "I repeat some of the same patterns my parents used with me, even when I don't want to.",
    theme: "Generational repetition awareness"
  },
  {
    id: 6,
    question: "I worry often about being a 'good enough' parent.",
    theme: "Anxiety, self-criticism"
  },
  {
    id: 7,
    question: "When my child is angry with me, I take it personally.",
    theme: "Ego sensitivity, inner-child wounding"
  },
  {
    id: 8,
    question: "When things don't go as planned at home, I feel tense or restless.",
    theme: "Control & rigidity"
  },
  {
    id: 9,
    question: "I avoid showing my child my sadness or vulnerability.",
    theme: "Avoidance, fear of weakness"
  },
  {
    id: 10,
    question: "I find it hard to ask for help when parenting feels overwhelming.",
    theme: "Shame, independence masking need"
  },
  {
    id: 11,
    question: "I feel uncomfortable when my child expresses anger or frustration.",
    theme: "Fear of intensity; discomfort with emotion"
  },
  {
    id: 12,
    question: "I often think about how my childhood affects how I parent.",
    theme: "Self-awareness, reflection"
  },
  {
    id: 13,
    question: "I sometimes feel disconnected from my child's inner world.",
    theme: "Emotional distance / detachment"
  },
  {
    id: 14,
    question: "I want to be more emotionally expressive but don't always know how.",
    theme: "Self-awareness of repression; readiness for growth"
  },
  {
    id: 15,
    question: "I believe parenting is also a journey to heal my own inner child.",
    theme: "Openness to transformation & reparenting"
  }
];

// Additional questions for mothers
const motherQuestions = [
  {
    id: 16,
    question: "I often feel I must be everything – caregiver, homemaker, worker – all at once.",
    theme: "Over-responsibility / burnout"
  },
  {
    id: 17,
    question: "I struggle to ask for help even when I'm exhausted.",
    theme: "Learned self-neglect"
  },
  {
    id: 18,
    question: "I feel my child's emotions so deeply that I sometimes forget my own.",
    theme: "Emotional enmeshment"
  }
];

// Additional questions for fathers
const fatherQuestions = [
  {
    id: 16,
    question: "I find it easier to provide than to express love openly.",
    theme: "Provider identity; emotional suppression"
  },
  {
    id: 17,
    question: "I sometimes feel disconnected from my child's daily life.",
    theme: "Emotional distance / busyness"
  },
  {
    id: 18,
    question: "I want to be more emotionally open, but I don't always know how.",
    theme: "Readiness for healing"
  }
];

export function getQuestionsForRole(role) {
  let questions = [...mainQuestions];

  if (role === "mother") {
    questions = questions.concat(motherQuestions);
  } else if (role === "father") {
    questions = questions.concat(fatherQuestions);
  }

  return questions;
}

export { mainQuestions, motherQuestions, fatherQuestions };
