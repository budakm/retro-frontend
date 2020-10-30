node {
  
    stage('Clone Repository') {

        checkout scm
        
    }

    stage('Populate Envs') {
        sh "echo VUE_APP_WEBSOCKET_URI=ws://18.132.36.78:46992 > .env.production"
        sh "echo VUE_APP_API_URI=http://18.132.36.78:46991 >> .env.production"
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
            sh "ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 \"docker pull budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}\""
            sh "ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 \"docker stop ${env.JOB_BASE_NAME} && docker rm ${env.JOB_BASE_NAME}\" || true"
            sh "ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 \"docker run -d --name=${env.JOB_BASE_NAME} -p 80:80 --restart unless-stopped budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}\""
        }
    }

    stage('Clean Workspace') {
        sh "rm -rf ${env.WORKSPACE}/*"
        
    }    
}
