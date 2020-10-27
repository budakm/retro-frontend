node {
  
    stage('Clone Repository') {

        checkout scm
        
    }

    stage('Build and Push Docker Image') {

        def dockerfile = 'Dockerfile' 
        def customImage = docker.build("budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}", "-f ./${dockerfile} .") 
 
        docker.withRegistry('https://registry-1.docker.io', 'budakdigital-dockerhub-credential') {     
            customImage.push("${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}")
        } 
    }

    stage('Deploy into 18.132.36.78 / 10.10.1.125') { 
        sshagent(credentials : ['jenkins-deployer']) {
            sh 'ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 "docker pull budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}"'
            sh 'ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 "docker stop --name=${env.JOB_BASE_NAME} && docker rm --name=${env.JOB_BASE_NAME} '
            sh 'ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 "docker run -d --name=${env.JOB_BASE_NAME} -p 80:80 budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}"'
        }
    }

    stage('Clean Workspace') {
        sh "rm -rf ${env.WORKSPACE}/*"
        
    }    
}
