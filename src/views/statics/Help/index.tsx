import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const style: React.CSSProperties = {
    marginTop: '20%',
    marginLeft: '25%'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: '10%'
        },
        heading: {
            fontSize: theme.typography.pxToRem(20),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
)

const Help: React.FC = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>サイトの使い方</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            使い方は<a href="https://www.ed.tus.ac.jp/eic/articles/typingCRUD_1/index.html" rel="noopener noreferrer" target="_blank" >こちらのページ</a>を御覧ください
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>お問い合わせフォーム</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <p>規約・プライバシーポリシーやサイトに関する疑問点等ございましたら下記のフォーム、またはメールアドレスからお願いいたします</p>
                            <p>連絡用メールアドレス：eictusnoda@gmail.com</p>
                            <iframe style={style} title="otoiawase" width="650" height="650" src="https://forms.gle/gH6HzEPbYCB3KbeN7" >読み込んでいます…</iframe>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Help
