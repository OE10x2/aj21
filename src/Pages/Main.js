import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
const jikanjs = require('jikanjs');

const useStyles = () => ({
    content: {
        display: 'flex', //Formatting card
        borderRadius: '16px', //For card border roundness
        width: '500px', //Limit card size
        height: '300px', //Limit card size
        paddingTop: '16px', //Round border for image
        paddingBottom: '16px', //Round border for image
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)', //Optional
    },
    media: {
        minWidth: '233px', //For all images to have same size
        paddingBottom: '66.66%', //For matching card height
        borderRadius: '16px', //For image border roundness
        transform: 'translateY(-16px)', //Fixing image position
    },
    nonMedia: {
        display: 'flex', //Essential
        flexDirection: 'column', //CardActions must align vertically with CardContent
        justifyContent: 'space-between', //Keep CardActions at bottom
    },
});

class Main extends React.Component{
    state = {
        values: [],
        length: -1, //Cannot be 0, as the array is empty initially as well
    };

    async componentDidMount(){
        //First load the userList
        const userList = await jikanjs.loadUser('OE10x2', 'animelist');
        //Only need "anime" component from userList
        //First, pass in the length of userList
        this.setState({length: userList.anime.length});
        //Next, pass in all Objects in the array for "anime" component
        for (const e of userList.anime) this.setState({values: [...this.state.values, e]});
    }
  
    render(){
        const {classes} = this.props;

        if (this.state.values.length !== this.state.length){
            //Make sure all Objects are loaded from API
            return <LinearProgress />;
        }

        return(
            <Grid container
            direction="row"
            spacing={2}
            >
                {this.state.values.map(value => (
                    <Grid item xs key={`${value.mal_id} ITEM`}>
                        <Card
                        key={`${value.mal_id} CARD`}
                        className={classes.content}
                        >
                            <CardMedia
                            image={value.image_url}
                            className={classes.media}
                            />
                            <div className={classes.nonMedia}>
                                <CardContent>
                                {value.type} {value.mal_id}
                                <h2 style={{ color: '#0051A5' }}>
                                    {value.title}
                                </h2>
                                {value.watched_episodes}/{value.total_episodes}
                                </CardContent>
                                <CardActions>
                                    <Link to={`/anime/${value.mal_id}`}>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<MoreHorizIcon />}
                                        >
                                            LEARN MORE
                                        </Button>
                                    </Link>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            );
    }
}

export default withRouter(withStyles(useStyles)(Main));