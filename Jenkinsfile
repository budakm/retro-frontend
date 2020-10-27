node {
  
    stage('Clone Repository') {

        checkout scm
        
    }

    stage('Build and Push Docker Image') {

        def dockerfile = 'Dockerfile' 
        def customImage = docker.build("budakdigital/wmr:${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}", "-f ./${dockerfile} .") 
 
        docker.withRegistry('https://registry-1.docker.io', 'budakdigital-dockerhub-credential') {     
          //customImage.push("${imageTag}")
            customImage.push("${env.JOB_BASE_NAME}-${env.BUILD_NUMBER}")
        } 
    }

    stage('Deploy') { 
        sshagent(credentials : ['jenkins-deployer']) {
            sh 'ssh -o StrictHostKeyChecking=no jenkins@10.10.1.125 "docker images && mkdir /tmp/jenkins"'
            //sh 'ssh -v user@hostname.com'
            //sh 'scp ./source/filename user@hostname.com:/remotehost/target'
        }
    }    
}
