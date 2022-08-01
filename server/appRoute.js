import { authRouter, userRouter, appRouter, postRouter, commentRouter } from './src/routes'

const appRoute = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/app', appRouter)
    app.use('/api/post', postRouter)
    app.use('/api/comment', commentRouter)
    return app.use('/', (req, res) => { res.send('server is running') })
}

export default appRoute