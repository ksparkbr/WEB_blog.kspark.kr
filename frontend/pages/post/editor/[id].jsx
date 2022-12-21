import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic'
import LoadingSpinner from "../../../src/component/common/LoadingSpinner";
import 'react-quill/dist/quill.bubble.css'
import Head from "next/head";

const PostEditor = dynamic(() => import('../../../src/component/post/PostEditor'), {
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
        if(data !== 'Access Denied') setPost(data);
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
        <Head>
            <title>
                {mode != "new" ? "글 수정 | BLOG.KSPARK.KR" : "글 작성 | BLOG.KSPARK.KR"}
            </title>
        </Head>
        {mode != "new" ? post &&
            <PostEditor mode="edit" post={post} />
            :
            <PostEditor mode="new" />
        }
    </>
}