// Define the structure for a link
export interface ILink {
    title: string;
    url: string;
  }
  
  // Define the structure for course content
 export  interface ICourseContentSchema {
    contentVideo: any;
    videoSection: string;
    title: string;
    description: string;
    links: ILink[];
    suggestion: string;
  }
  
  // Define the structure for benefits and prerequisites
  export interface IBenefit {
    title: string;
  }
  export interface IPrerequisites {
    title: string;
  }
  
  // Define the structure for course information
 export  interface ICourseInfo {
    name: string;
    description: string;
    price: number;
    estimatedPrice: number;
    tags: string;
    thumbnail: any;
    level: string;
    demoVideo: any;
  }
  
  // Define the structure for the final data object
 export  interface ICourseData {
    name: string;
    description: string;
    categories:string;
    price: string;
    estimatedPrice: string;
    tags: string;
    thumbnail: any;
    level: string;
    demoVideo: any;
    prerequisites: IBenefit[];
    benefits: IBenefit[];
    courseContent: ICourseContentSchema[];
  }