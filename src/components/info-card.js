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

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(#ddeff2,#bfe2e8)"
  },
  avatar: {
    width: 120,
    height: 80,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      height: 80
    }
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

export default function InfoCard({title, group, image, overview, details}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  
  return (
    <MDBCol size="12" style={{minWidth: "350px", margin: "15px auto" }}>
      <Card raised className={classes.root}>
        <CardHeader
          avatar={<Avatar aria-label="icon-photo" src={image} className={classes.avatar} variant='rounded'/>}
          title={title}
          titleTypographyProps={{variant: 'h6' }}
          subheader={group}
        />
        <CardContent>
          <Typography variant="body1Next" component="p">
            {overview}
          </Typography>
        </CardContent>
        {details &&
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
        </CardActions>}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </CardContent>
        </Collapse>
      </Card>
    </MDBCol>
  )
}