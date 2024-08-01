type VolunteerEvent = {
    slug: string;
    title: string;
    date: Date;
    about: string;
}

export const eventList:VolunteerEvent[] = [
    {slug: "planting-trees", title:"Planting Trees", date: new Date(), about: "this is an example event a"},
    {slug: "having-fun", title:"b", date: new Date(), about: "this is an example event b"},
    {slug: "test", title:"c", date: new Date(), about: "this is an example event c"},
]