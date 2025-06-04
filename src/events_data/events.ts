import event1 from '../assets/event1.png';
import cascadia_biofi from '../assets/cadcadia-biofi.jpg';
import climate_week from '../assets/climateweek.png';
import steamplant from '../assets/steamplant.jpg';

export type VolunteerEvent = {
    slug: string;
    title: string;
    image: string;
    date: Date;
    endDate?: Date; // Represents last day of event if it's multiple days.
    location: string;
    about: string;
    open?: boolean;
}

export const eventList:VolunteerEvent[] = [
    {slug: "tree-giveaway", 
        title:"Tree Giveaway", 
        image: event1, 
        date: new Date("2025-04-02"), 
        location: "Bellevue, WA", 
        about: "Ruta Verde is giving away tree saplings to individuals and organizations"},
    {slug: "chelan-trip", 
        title:"Lake Chelan Property Volunteering", 
        image: event1, date: new Date("2025-04-26"), 
        location: "Lake Chelan, WA", 
        about: "A group of volunteers from Ruta Verde and other organiations are driving up to the property in Lake Chelan. During this time they'll be planting trees, foraging the land, studying bio-diversity and more."},
    {slug: "cascadia-biofi", 
        title:"Cascadia BioFi Conference", 
        image: cascadia_biofi,
        date: new Date("2025-05-16"), 
        location: "Georgetown Steamplant", 
        about: "Ruta Verde will be tabling at the Cascadia BioFi Conference. Learn more at www.cascadiabiofi.org/", 
        open: true},
    {slug: "meeting-june", 
        title:"Ruta Verde Meeting", 
        image: event1, date: new Date("2025-06-01"), 
        location: "Online", 
        about: "Monthly Ruta Verde meeting. Join and learn what Ruta Verde has accomplished this month and what our future plans are."
        },
    {slug: "meeting-july", 
        title:"Ruta Verde Meeting", 
        image: event1, date: new Date("2025-07-06"), 
        location: "Online", 
        about: "Monthly Ruta Verde meeting. Join and learn what Ruta Verde has accomplished this month and what our future plans are."
        },
    {slug: "pnw-climate-week", 
        title:"PNW Climate Week", 
        image: climate_week, 
        date: new Date("2025-07-16"),
        endDate: new Date("2025-07-25"),
        location: "Vancouver BC / Portland OR", 
        open: true,
        about: "Ruta Verde will be speaking at the Pacific Northwest Climate week event. Find out more at https://pnwclimateweek.org/."
        },
    {slug: "meeting-august", 
        title:"Ruta Verde Meeting", 
        image: event1, date: new Date("2025-08-03"), 
        location: "Online", 
        about: "Monthly Ruta Verde meeting. Join and learn what Ruta Verde has accomplished this month and what our future plans are."
        },
    {slug: "georgetown-science-fair", 
        title:"Georgetown Science Fair", 
        image: steamplant, date: new Date("2025-09-20"), 
        location: "Georgetown Steamplant",
        open: true, 
        about: "Ruta Verde will be tabling at the Georgetown Science Fair! Click https://www.georgetownsteamplant.org/break-the-system to learn more."
        },
]