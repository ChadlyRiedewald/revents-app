import { Comment, Header, Segment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    firebaseObjectToArray,
    getEventChatRef,
} from '../../../app/firestore/firebaseService';
import { listenToEventChat } from '../eventActions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { CLEAR_COMMENTS } from '../eventConstants';
import { createDataTree } from '../../../app/common/util/util';
import { onValue, off } from 'firebase/database';

const EventDetailedChat = ({ eventId }) => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.event);
    const { authenticated } = useSelector(state => state.auth);
    const [showReplyForm, setShowReplyForm] = useState({
        open: false,
        commentId: null,
    });

    function handleCloseReplyForm() {
        setShowReplyForm({ open: false, commentId: null });
    }

    useEffect(() => {
        onValue(getEventChatRef(eventId), snapshot => {
            if (!snapshot.exists()) return;
            dispatch(
                listenToEventChat(
                    firebaseObjectToArray(snapshot.val()).reverse()
                )
            );
        });
        return () => {
            dispatch({ type: CLEAR_COMMENTS });
            off(getEventChatRef());
        };
    }, [eventId, dispatch]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>
                    {authenticated
                        ? 'Chat about this event'
                        : 'Sign in to view and comment'}
                </Header>
            </Segment>

            {authenticated && (
                <Segment attached>
                    <EventDetailedChatForm
                        eventId={eventId}
                        parentId={0}
                        closeForm={setShowReplyForm}
                    />
                    <Comment.Group>
                        {createDataTree(comments).map(comment => (
                            <Comment key={comment.id}>
                                <Comment.Avatar
                                    as={Link}
                                    to={`/profile/${comment.uid}`}
                                    src={comment.photoURL || 'assets/user.png'}
                                />
                                <Comment.Content>
                                    <Comment.Author
                                        as={Link}
                                        to={`/profile/${comment.uid}`}
                                    >
                                        {comment.displayName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>
                                            {formatDistance(
                                                comment.date,
                                                new Date()
                                            )}
                                        </div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        {comment.text
                                            .split('\n')
                                            .map((text, i) => (
                                                <span key={i}>
                                                    {text}
                                                    <br />
                                                </span>
                                            ))}
                                    </Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action
                                            onClick={() =>
                                                setShowReplyForm({
                                                    open: true,
                                                    commentId: comment.id,
                                                })
                                            }
                                        >
                                            Reply
                                        </Comment.Action>
                                        {showReplyForm.open &&
                                            showReplyForm.commentId ===
                                                comment.id && (
                                                <EventDetailedChatForm
                                                    eventId={eventId}
                                                    parentId={comment.id}
                                                    closeForm={
                                                        handleCloseReplyForm
                                                    }
                                                />
                                            )}
                                    </Comment.Actions>
                                </Comment.Content>
                                {comment.childNodes.length > 0 && (
                                    <Comment.Group>
                                        {comment.childNodes
                                            .reverse()
                                            .map(child => (
                                                <Comment key={child.id}>
                                                    <Comment.Avatar
                                                        as={Link}
                                                        to={`/profile/${child.uid}`}
                                                        src={
                                                            child.photoURL ||
                                                            'assets/user.png'
                                                        }
                                                    />
                                                    <Comment.Content>
                                                        <Comment.Author
                                                            as={Link}
                                                            to={`/profile/${child.uid}`}
                                                        >
                                                            {child.displayName}
                                                        </Comment.Author>
                                                        <Comment.Metadata>
                                                            <div>
                                                                {formatDistance(
                                                                    child.date,
                                                                    new Date()
                                                                )}
                                                            </div>
                                                        </Comment.Metadata>
                                                        <Comment.Text>
                                                            {child.text
                                                                .split('\n')
                                                                .map(
                                                                    (
                                                                        text,
                                                                        i
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {
                                                                                text
                                                                            }
                                                                            <br />
                                                                        </span>
                                                                    )
                                                                )}
                                                        </Comment.Text>
                                                        <Comment.Actions>
                                                            <Comment.Action
                                                                onClick={() =>
                                                                    setShowReplyForm(
                                                                        {
                                                                            open: true,
                                                                            commentId:
                                                                                child.id,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                Reply
                                                            </Comment.Action>
                                                            {showReplyForm.open &&
                                                                showReplyForm.commentId ===
                                                                    child.id && (
                                                                    <EventDetailedChatForm
                                                                        eventId={
                                                                            eventId
                                                                        }
                                                                        parentId={
                                                                            child.parentId
                                                                        }
                                                                        closeForm={
                                                                            handleCloseReplyForm
                                                                        }
                                                                    />
                                                                )}
                                                        </Comment.Actions>
                                                    </Comment.Content>
                                                </Comment>
                                            ))}
                                    </Comment.Group>
                                )}
                            </Comment>
                        ))}
                    </Comment.Group>
                </Segment>
            )}
        </>
    );
};

export default EventDetailedChat;
