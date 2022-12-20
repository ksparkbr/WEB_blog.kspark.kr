import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic'
import LoadingSpinner from "../../../src/component/common/LoadingSpinner";
import 'react-quill/dist/quill.bubble.css'

const PostEditor = dynamic(() => import('../../../src/component/post/PostEditor'),{
    ssr: false,
    loading: () => <LoadingSpinner />
});

export default function _PostWrite() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState();
    const [mode, setMode] = useState("new");
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const session = useSelector(s => s.session);

    const getPost = async () => {
        let data = await axios.post(API_URL + "/post/view/" + id, { session: session.session }, { withCredentials: true })
            .then(res => res.data);
        setPost(data);
    }
    useEffect(() => {
        if (id != "new") {
            getPost()
            setMode("edit");
        }
        else {
            setMode("new");
        };
    }, [id])    

    return <>
        {mode != "new" ? post &&
            <PostEditor mode="edit" post={post}/>
            :
            <PostEditor mode="new" />
        }
    </>
}