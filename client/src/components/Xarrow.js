import React, { memo } from 'react'
import Xarrow from "react-xarrows";

const XarrowCustom = ({ comments, start }) => {
    return (
        <>
            {comments?.length > 0 && comments.map(item => {
                return (
                    <div key={item.id}>
                        <Xarrow
                            startAnchor={'bottom'}
                            start={start}
                            end={item.id}
                            strokeWidth={0.5}
                            showHead={false}
                            endAnchor={'left'}
                            path={'grid'}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default memo(XarrowCustom)