// tag::copyright[]
/*******************************************************************************
 * Copyright (c) 2017, 2022 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/
// end::copyright[]
package oz.rest;

import java.util.HashMap;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

// tag::path[]
@Path("properties")
// end::path[]
public class PropertiesResource {

    // tag::get[]
    @GET
    // end::get[]
    // tag::produces[]
    @Produces(MediaType.APPLICATION_JSON)
    // end::produces[]
    public HashMap<String, String> getProperties() {
        HashMap<String, String> map = new HashMap<>();
        map.put("test", "test2");

        return map;
        // return System.getProperties();
    }

}