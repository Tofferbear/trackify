import React from 'react';
import TrackifyBusinessLogic from './TrackifyBusinessLogic';
import ITrackifyContentProps from './ITrackifyContentProps';
import ITrackifyContentState from './ITrackifyContentState';
import CollapsibleContainer from '../submodules/react-container-components/components/CollapsibleContainer';
import TrackPlayMetadata from './TrackPlayMetadata';

export default class TrackifyContent extends React.Component<ITrackifyContentProps, ITrackifyContentState> {
    private businessLogic: TrackifyBusinessLogic;

    constructor(props: any) {
        super(props);

        this.state = {
            artistWithMostPlays: "",
            avgSongLength: "",
            longestSong: "",
            shortestSong: "",
            totalTimeListened: "",
            trackPlaySum: 0,
            uniqueTrackPlaySum: 0
        }

        this.businessLogic = new TrackifyBusinessLogic();
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            artistWithMostPlays: await this.businessLogic.getArtistWithMostPlays(),
            avgSongLength: await this.businessLogic.getAvgSongLength(),
            longestSong: await this.businessLogic.getLongestSong(),
            shortestSong: await this.businessLogic.getShortestSong(),
            totalTimeListened: await this.businessLogic.getTotalTimeListened(),
            trackPlaySum: await this.businessLogic.getTrackPlaySum(),
            uniqueTrackPlaySum: await this.businessLogic.getUniqueTrackPlaySum()
        });
    }

    render() {
        return (
            <CollapsibleContainer
                enableCollapse={true}
                label={"Trackify - Spotify Metrics Tracking"}
            >
                <TrackPlayMetadata
                    artistWithMostPlays={this.state.artistWithMostPlays}
                    avgSongLength={this.state.avgSongLength}
                    longestSong={this.state.longestSong}
                    shortestSong={this.state.shortestSong}
                    totalTimeListened={this.state.totalTimeListened}
                    trackPlaySum={this.state.trackPlaySum}
                    uniqueTrackPlaySum={this.state.uniqueTrackPlaySum}
                />
            </CollapsibleContainer>
        );
    }
}
