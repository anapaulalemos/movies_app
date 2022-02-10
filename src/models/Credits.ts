interface Cast {
    id: string;
    name: string;
    profile_path: string;
    character: string;
}

interface Crew {
    name: string;
    job: string;
}

interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export type {
    Credits,
    Cast,
    Crew
}