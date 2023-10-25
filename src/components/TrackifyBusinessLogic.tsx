export default class TrackifyBusinessLogic {
    async getPlayCountJsonAsync(): Promise<any> {
        let playCountDataJson: any = {};

        try {
            playCountDataJson = (await import("PlayCounts.json")).default;
        } finally {
            return playCountDataJson;
        }
    }

    async getArtistWithMostPlays(): Promise<string> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return "";
        }

        const artistPlayCounts: any = {};

        for (let trackIndex = 0; trackIndex < playCountDataJson.length; trackIndex++) {
            for (let artistIndex = 0; artistIndex < playCountDataJson[trackIndex].album.artists.length; artistIndex++) {
                const artistName = playCountDataJson[trackIndex].album.artists[artistIndex].name;
                if (artistPlayCounts.hasOwnProperty(artistName)) {
                    artistPlayCounts[artistName].playCounts++;
                } else {
                    artistPlayCounts[artistName] = {
                        playCounts: 1
                    }
                }
            }
        }

        let highestPlayCount = 0;
        let highestPlayCountArtist = "";

        for (const prop in artistPlayCounts) {
            if (prop !== "Various Artists" && artistPlayCounts.hasOwnProperty(prop) && artistPlayCounts[prop].playCounts > highestPlayCount) {
                highestPlayCount = artistPlayCounts[prop].playCounts;
                highestPlayCountArtist = prop;
            }
        }

        return `${highestPlayCountArtist} (${highestPlayCount})`;
    }


    async getAvgSongLength(): Promise<string> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return "";
        }

        const avgSongLength = (playCountDataJson.reduce((sum: number, item: { duration_ms: number, play_count: number }) => sum + (item.duration_ms * item.play_count), 0) / await this.getTrackPlaySum());
        const dateTimeFromMs = new Date(avgSongLength);

        return `${dateTimeFromMs.getUTCHours()}h : ${dateTimeFromMs.getUTCMinutes()}m : ${dateTimeFromMs.getUTCSeconds()}s`;
    }

    async getLongestSong(): Promise<string> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return "";
        }

        const maxLengthSong = playCountDataJson.reduce((prev: any, current: any) => (prev.duration_ms > current.duration_ms) ? prev : current);
        const dateTimeFromMs = new Date(maxLengthSong.duration_ms);
       
        return `${maxLengthSong.name} (${dateTimeFromMs.getUTCHours()}h : ${dateTimeFromMs.getUTCMinutes()}m : ${dateTimeFromMs.getUTCSeconds()}s)`;
    }

    async getShortestSong(): Promise<string> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return "";
        }

        const minLengthSong = playCountDataJson.reduce((prev: any, current: any) => (prev.duration_ms < current.duration_ms) ? prev : current);
        const dateTimeFromMs = new Date(minLengthSong.duration_ms);
       
        return `${minLengthSong.name} (${dateTimeFromMs.getUTCHours()}h : ${dateTimeFromMs.getUTCMinutes()}m : ${dateTimeFromMs.getUTCSeconds()}s)`;
    }

    async getTotalTimeListened(): Promise<string> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return "";
        }

        const sumOfSongLengths = playCountDataJson.reduce((sum: number, item: { duration_ms: number, play_count: number }) => sum + (item.duration_ms * item.play_count), 0);
        const secInMs = 1000;
        const minInMs = 60000;
        const hourInMs = 3600000
        const dayInMs = 86400000
        const daysListened = Math.trunc(sumOfSongLengths / dayInMs);
        const hoursListened = Math.trunc((sumOfSongLengths % dayInMs) / hourInMs);
        const minutesListened = Math.trunc(((sumOfSongLengths % dayInMs) % hourInMs) / minInMs);
        const secondsListened = Math.trunc((((sumOfSongLengths % dayInMs) % hourInMs) % minInMs) / secInMs);
        const millisecondsListened = (((sumOfSongLengths % dayInMs) % hourInMs) % minInMs) % secInMs;

        return `${daysListened}d : ${hoursListened}h : ${minutesListened}m : ${secondsListened}s : ${millisecondsListened}ms`;
    }

    async getTrackPlayCounts(): Promise<any[]> {
        const trackPlayCounts: any[] = [];
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return trackPlayCounts;
        }


        return trackPlayCounts;
    }

    async getTrackPlaySum(): Promise<number> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return 0;
        }

        return playCountDataJson.reduce((sum: number, item: { play_count: number }) => sum + item.play_count, 0);
    };

    async getUniqueTrackPlaySum(): Promise<number> {
        const playCountDataJson = await this.getPlayCountJsonAsync();

        if (!playCountDataJson.hasOwnProperty("length")) {
            return 0;
        }

        return playCountDataJson.length;
    }
}