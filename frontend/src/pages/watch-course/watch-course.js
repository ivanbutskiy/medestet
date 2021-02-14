import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import HeaderWatchCourse from './header-watch-course';
import CourseContent from './course-content';
import CourseModuleItem from './course-module-item';
import ErrorBanner from '../../components/error-banner';
import LessonContent from './lesson-content';

import Spinner from '../../components/spinner';

import MedestetService from '../../service/medestet-service';


import './watch-course.css';

class WatchCourse extends Component {

    state = {
        error: false,
        loading: true,

        headerImage: '',
        title: '',
        modules: '',
        slug: '',
        detailDescription: '',
        previewImage: '',

        moduleItems: '',

        lessonDetail: '',
        showLesson: '',
        lessonLoading: false,
        lessonError: false
    };

    service = new MedestetService();

    getUserWatchCourse() {
        this.service.getUserWatchCourse(this.props.match.params.slagCourse)
            .then(result => {
                this.setState({
                    headerImage: result.data.header_image,
                    title: result.data.title,
                    modules: result.data.module,
                    slug: result.data.slug,
                    detailDescription: result.data.detail_description,
                    previewImage: result.data.preview_image
                });
                this.setState({ loading: false });
            }).catch(error => {
                this.setState({ error: true });
            });
    };

    getLessonDetail() {
        const { slagCourse, lessonId } = this.props.match.params;
        this.setState({ 
            lessonLoading: true,
            lessonError: false })
        this.service.getLessonDetail(slagCourse, lessonId)
            .then(result => {
                this.setState({ 
                    lessonDetail: <LessonContent 
                        lesson={ result.data }
                        lessonLoading={ this.state.lessonLoading }
                        lessonError={ this.state.lessonError }
                        /> });
                this.setState({ 
                    lessonLoading: false,
                    lessonError: false })
            }).catch(error => {
                this.setState({ 
                    lessonError: true,
                    lessonDetail: '',
                    lessonLoading: false });
            });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const {
                slagCourse,
                lessonId,
                moduleId
            } = this.props.match.params
    
            if (slagCourse && lessonId && moduleId) {
                this.getLessonDetail();
                this.setState({ showLesson: true });
            };
        };
    };

    componentDidMount() {
        this.getUserWatchCourse();

        const {
            slagCourse,
            lessonId,
            moduleId
        } = this.props.match.params

        if (slagCourse && lessonId && moduleId) {
            this.getLessonDetail();
            this.setState({ showLesson: true });
        };
    };

    render() {

        const {
            
            loading,
            error,
            
            headerImage,
            title,
            slug,
            detailDescription,
            previewImage,
            lessonDetail,
            showLesson,

            lessonLoading,
            lessonError
            } = this.state;

        if (error) {
            return (
                <div className='course-detail shadow-lg justify-content-center p-2'>
                    <div className='course-watch-error'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        if (loading) {
            return (
                <div className='course-detail shadow-lg justify-content-center p-2'>
                    <div className='course-detail-spinner'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        const getCourseModules= () => {
            let moduleNum = 0;
            return this.state.modules.map(module => {
                    return <CourseModuleItem 
                    moduleNum={ ++moduleNum }
                    module={ module }
                    key={ module.id }
                    courseSlug={ slug } />
            });
        };

        return (
            <div className='course-detail watch-course shadow-lg justify-content-center p-2'>
                <HeaderWatchCourse 
                    headerImage={ headerImage } 
                    title={ title }
                />
                <div className='row mb-4'>
                    <div className='col-md-4 mt-2'>

                        <div id='accordionExample' className='accordion shadow-sm'>
                            { getCourseModules() }
                        </div>
                    </div>
                    <div className='col-md-8 mt-2'>
            
                        {  !showLesson ? <CourseContent 
                                detailDescription={ detailDescription }
                                previewImage={ previewImage } /> : null }
                        
                        { showLesson && lessonLoading && this.props.match.params.lessonId ? 
                            <Spinner /> : null }
                        
                        { showLesson && !lessonLoading ? lessonDetail : null }

                        { lessonError && !lessonDetail ? 
                            <div className='mt-4'>
                                <ErrorBanner />
                            </div> : null }
            
                    </div>
                </div>
            </div>
        );
    };
};

export default withRouter(WatchCourse);