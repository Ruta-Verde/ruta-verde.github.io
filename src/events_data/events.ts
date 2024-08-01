type VolunteerEvent = {
    slug: string;
    title: string;
    date: Date;
    location: string;
    about: string;
}

export const eventList:VolunteerEvent[] = [
    {slug: "planting-trees", title:"Planting Trees", date: new Date(), location: "Joao's House", about: "this is an example event a this is an example event a this is an example event a this is an example event a this is an example event a this is an example event a this is an example event a this is an example event a "},
    {slug: "having-fun", title:"Having Fun", date: new Date(), location: "my house", about: "Lorem ipsum dolor sit amet, veniam diceret eripuit qui an. Nostro nonumes recteque no has, soleat signiferumque vix ex. Minim accusam sed id, eros malis invidunt ius et. Per in errem ignota. Fugit habemus mediocrem vix ut, consul consetetur an cum"},
    {slug: "test", title:"Test", date: new Date(), location: "behind you", about: "this is an example event c"},
]