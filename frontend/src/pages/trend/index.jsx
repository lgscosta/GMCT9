import { useState } from "react"
import { useEffect } from "react"
import { api } from "../../services/api"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { toast } from 'react-toastify'

const Trend = () => {
    const [course, setCourse] = useState({ subjectsDone: [], percentageDone: 0 })
    const getMyCourse = async () => {
        try {

            const { data } = await api.get('/mycourse')
            setCourse(data)
        } catch (error) {
            toast.error(error.response.data.msg)
            console.log({ error })
        }
    }

    const updateCourse = async ({ checked, subject, index }) => {
        const newSubject = { ...subject, aproved: checked }
        const newSubjectsDone = course.subjectsDone
        newSubjectsDone[index] = newSubject
        const totalSubjects = newSubjectsDone.length
        const totalSubjectsDone = newSubjectsDone.filter(subject => subject.aproved).length
        const percentageDone = (100 * totalSubjectsDone) / totalSubjects
        setCourse({ ...course, subjectsDone: newSubjectsDone, percentageDone })
        try {

            await api.post('/subject', {
                curriculumId: newSubject.curriculumId,
                aproved: newSubject.aproved
            })
            // toast.success('Sucesso ao atualizar a progressão curricular')
        } catch ({ error }) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getMyCourse()

    }, [])
    return <div>
        <div className="text-2xl text-white">Progressão <b className="text-gmct-pink">Curricular</b>!</div>
        <div className="grid gap-5 my-5 " style={{ gridTemplateColumns: '1fr 288px' }}>
            <div className="bg-gmct-blue rounded-lg p-4">
                <table className="w-full" >
                    <th className="text-white">Codigo</th>
                    <th className="text-white">Diciplina</th>
                    <th className="text-white">CH</th>
                    <th className="text-white">CR</th>
                    <th className="text-white">Aprovado</th>
                    <thead>
                    </thead>
                    <tbody>
                        {course.subjectsDone.map((subject, index) => <tr>
                            <td className="text-white text-center">{subject.cod}</td>
                            <td className="text-white text-center">{subject.nameSubject}</td>
                            <td className="text-white text-center">{subject.workload}</td>
                            <td className="text-white text-center">{subject.cred}</td>
                            <td className="text-center"><input type="checkbox" checked={subject.aproved} onChange={(event) => updateCourse({ checked: event.target.checked, subject, index })} value={subject.aproved} /></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="bg-gmct-blue rounded-lg p-4 h-72">
                <CircularProgressbar
                    styles={buildStyles({
                        textColor: "#FF85CB",
                        pathColor: "#FF85CB",
                        trailColor: "#2B2F42"
                    })}
                    value={course.percentageDone}
                    text={`${Math.round(course.percentageDone)}%`}
                />
            </div>
        </div>

    </div>

}

export default Trend