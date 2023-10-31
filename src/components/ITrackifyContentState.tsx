export default interface ITrackifyContentState {
    artistWithMostPlays: string,
    avgSongLength: string,
    longestSong: string,
    shortestSong: string,
    totalTimeListened: string,
    trackPlayData: any[],
    trackPlaySum: number,
    uniqueTrackPlaySum: number
}