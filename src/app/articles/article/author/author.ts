export class Author {
    constructor(public id: number,
                public username: string,
                public email: string,
                public twitch: string,
                public createDate: number,
                public twitchData: TwitchData,
                public game: string) {
    }
}

export class TwitchData {
    constructor(public _id: number,
                public game: string,
                public viewers: number,
                public video_height: number,
                public average_fps: number,
                public delay: number,
                public created_at: string,
                public is_playlist: boolean,
                public stream_type: string,
                public preview: Preview,
                public channel: Channel,
                public links: any) {
    }
}

export class Preview {
    constructor(public small: string,
                public medium: string,
                public large: string,
                public template: string) {
    }
}

export class Channel {
    constructor(public mature: boolean,
                public partner: boolean,
                public status: string,
                public broadcaster_language: string,
                public display_name: string,
                public game: string,
                public language: string,
                public _id: number,
                public name: string,
                public created_at: string,
                public updated_at: string,
                public delay: number,
                public logo: string,
                public banner: string, // TODO if this is right type
                public video_banner: string,
                public background: string, // TODO if this is right type
                public profile_banner: string,
                public profile_banner_background_color: string,
                public url: string,
                public views: number,
                public followers: number) {
    }
}
