export interface Testimonial {
  id: string;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  color?: string; // Optional background color for the avatar if no image
  initial?: string; // Optional initial letter for the avatar if no image
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    username: "Michael Richards",
    handle: "@michaelrichards",
    content:
      "Marley is the only coach who actually understands the unique energy challenges high-performers face. His Limitless Protocol didn't just transform my productivity—it completely rewired my relationship with energy.",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    id: "2",
    username: "Jessica Franco",
    handle: "@JessicaFranco1",
    content: "This is genuinely brilliant. Thanks for sharing!",
    avatar: "/images/testimonials/jessica.jpg",
    color: "#4299E1",
  },
  {
    id: "3",
    username: "Sneha Rathee",
    handle: "@Sneharathe",
    content:
      "Best video on the internet. Helped me so much in getting my life back on track, kept a record of my time and helped me get closer to my goals. Thank you so much for helping out!!",
    avatar: "/images/testimonials/sneha.jpg",
  },
  {
    id: "4",
    username: "Josy Shen",
    handle: "@josyshen2535",
    content:
      "I found your channel a month ago Olly and I subscribed without a doubt. It has amazing content which I am already putting into practice and its working AMAZINGLY. Thanks so much for all this information that has made me more productive, more task oriented, and is pushing me a step closer to achieving long wanted goals that I previously found so overwhelming to even start to achieve.",
    avatar: "/images/testimonials/josy.jpg",
  },
  {
    id: "5",
    username: "Kathryn Whitehead",
    handle: "@kathrynwhitehead4384",
    content:
      "I am 65 and live in the UK. I've slowed down so much I feel useless. Coming across you Olly has no only brightened my day (you are so funny) you showing me that actually doing a 'did do' list is so simple but it's really motivating me and it's added a purpose to my life. You are not only inspiring young entrepreneurs but very importantly you are giving us older ones the reason to get out of bed and face the day. Thank you!",
    avatar: "/images/testimonials/kathryn.jpg",
    color: "#38B2AC",
    initial: "K",
  },
  {
    id: "6",
    username: "Nicole Ebner",
    handle: "@nicoleebner4929",
    content:
      "To be honest, I only watch your videos at the moment, because you make such amazing content that inspires me to take out my journal. So Olly, thank you again for an amazing video.",
    avatar: "/images/testimonials/nicole.jpg",
  },
  {
    id: "7",
    username: "Sam",
    handle: "@Sam-qk4pj",
    content:
      "Love how doable this is, most journaling prompts and system overwhelm me.",
    avatar: "/images/testimonials/sam.jpg",
  },
  {
    id: "8",
    initial: "h",
    username: "Hippie Kansas Girl",
    handle: "@hippiekansasgirl1632",
    content:
      "Hi Olly! I like your simple approach to productivity. In fact, I've already gone out and purchased a pocket notebook to carry around with me - love, love, LOVE this idea!",
    color: "#4C51BF",
    avatar: "",
  },
  {
    id: "9",
    initial: "a",
    username: "Aquatic Duck",
    handle: "@aquaticduck-391",
    content:
      "So underrated! The level of research and information compiled into one video is great for someone like me who's watched so many journaling and self improvement videos but struggles to implement the advice.",
    color: "#E53E3E",
    avatar: "",
  },
  {
    id: "10",
    initial: "@",
    username: "Another User 2557",
    handle: "@anothername2557",
    content:
      "Your vibe, way of explaining your ability to segue into other topics and conciseness is like... AMAZING!",
    color: "#DD6B20",
    avatar: "/images/testimonials/user10.jpg",
  },
];

export default testimonials;
