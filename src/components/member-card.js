import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MDBCol } from 'mdbreact'
import Img from 'gatsby-image'

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(#ddeff2,#bfe2e8)"
  },
  media: {
    height: 230
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatarBg: {
    backgroundColor: theme.palette.primary.main,
  }
}))

export default function MemberCard({role, avatar, title, job, image, school, qualification1, qualification2, languages, availability, bio}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
  const avatars = {
    "doctor": "fa-user-md",
    "nurse": "fa-user-nurse",
    "receptionist": "fa-edit",
    "physiotherapist": "fa-hand-paper",
    "dietitian": "fa-seedling"
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <MDBCol size="4" style={{minWidth: "350px", margin: "15px auto" }}>
      <Card raised className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="role" className={classes.avatarBg}>
              <i className={`fas ${avatars[avatar]}`}></i>
            </Avatar>
          }
          title={title}
          titleTypographyProps={{variant: 'h6' }}
          subheader={job}
        />
        <Img
          className={classes.media} 
          alt={title} 
          fluid={image.fluid}
        />
        <CardContent>
          <Typography variant="body1" component="p">
            {school}
          </Typography>
          {qualification1 ?
            <Typography variant="body1" component="p">
              {qualification1}
            </Typography> :
            <Typography variant="body1" component="p">
              &nbsp;
            </Typography>}
          {qualification2 ?
            <Typography variant="body1" component="p">
              {qualification2}
            </Typography> :
            <Typography variant="body1" component="p">
              &nbsp;
            </Typography>}
          <Typography variant="body1" component="p">
            {`Languages: ${languages}`}
          </Typography>  
          <Typography variant="body1" component="p">
            {`Available: ${availability}`}
          </Typography>                            
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: bio }} />
          </CardContent>
        </Collapse>
      </Card>
    </MDBCol>
  )
}