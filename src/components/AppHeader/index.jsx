import { Box, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useLocation } from 'react-router'
import './index.scss'
import { useTranslation } from 'react-i18next'

export const AppHeader = () => {
    const location = useLocation()
    const contextRoutes = location.pathname.split('/') || []
    const { t } = useTranslation()
    const mapToName = t('menus.site-map-text', { returnObjects: true }) || []
    let realObjects = []
    if (contextRoutes.length > 0) {
        realObjects = contextRoutes.map((x, index) => {
            const array = [...contextRoutes.filter((x) => x)].splice(0, index)
            const display = mapToName.find((map) => map.to === x)
            // console.log('splices at', x, 'result', mapToName)
            return {
                text: x,
                url: '/' + array.join('/'),
                displayText: display ? display.text : ''
            }
            // realObjects.push()
        })
    }
    // console.log('origin obj', contextRoutes, 'parsing', realObjects)
    return (
        <Box display="flex" className="AppHeader">
            <div className="item-text-box">
                <Typography
                    className="item-text"
                    component="a"
                    href="/home"
                    style={{
                        height: 'auto',
                        textDecoration: 'none'
                    }}
                >
                    {t('appName')}
                </Typography>
            </div>
            {realObjects.map(
                (x, index) =>
                    x.text && (
                        <div
                            className="container"
                            key={x.url}
                            display="flex-inline"
                        >
                            <ArrowForward className="item-icon" />
                            <div className="item-text-box" style={{}}>
                                <Typography
                                    className="item-text"
                                    component={
                                        index < realObjects.length - 1
                                            ? 'a'
                                            : 'p'
                                    }
                                    href={
                                        index !== realObjects.length
                                            ? x.url
                                            : null
                                    }
                                    style={{
                                        height: 'auto',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {x.displayText}
                                </Typography>
                            </div>
                        </div>
                    )
            )}
        </Box>
    )
}
